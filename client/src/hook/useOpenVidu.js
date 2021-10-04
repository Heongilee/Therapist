import { useState, useCallback, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { getToken } from '../api/openViduApi';
import { useHistory } from "react-router-dom";
import api from '../api/api.js';

function useOpenVidu({ sessionId }) {
    
    const [session, setSession] = useState(undefined);
    const [SessionId, setSessionId] = useState(sessionId);
    const [Subscriber, setSubscriber] = useState([]);
    const [Publisher, setPublisher] = useState(undefined);
    const [OV, setOV] = useState(undefined);

    const history = useHistory();
    
    const leaveSession = useCallback(async() => {
   
      if (session)
            session.disconnect();
        // 방장이 현재 누구인지
        // api/openvidu/session/<SESSION_ID>

        // 방장이 나자신이면 카운트만 호출
        // 방장이 내가 아니면 방장교체 + 카운트 호출

        const exitEndPoint=`/openvidu/session/${SessionId}/exit`;
        await api.fetchRoomCount(exitEndPoint);

        const deleteEndPoint=`/openvidu/session/${SessionId}`;
        await api.fetchDeleteSession(deleteEndPoint);

        setOV(undefined);
        setSession(undefined);
        setSessionId(SessionId);
        setSubscriber([]);
        setPublisher(undefined);
        history.push('/');
      }, [session]);

  
        
      useEffect(() => {
        window.addEventListener('beforeunload', leaveSession);
        window.addEventListener('keydown', noRefreshEvent);

        return () => {
          console.log("언마운트")
          window.removeEventListener('beforeunload', leaveSession);
          window.removeEventListener('keydown', noRefreshEvent);

        }
      }, [leaveSession]);
      
      useEffect(() => {
        if(!OV){
          let OV = new OpenVidu();
          setOV(OV);
          setSession(OV.initSession());
        }
        
      }, []);

      const noRefreshEvent = (event) => {
        if (event.keyCode == 116) {
          event.preventDefault();
          event.returnValue = "";
          alert("새로고침을 할 수 없습니다.");
          return false;
        }
      };
      
      const subscribeStateChange = () => {
        session.on('streamPropertyChanged', (e) => {
          let remoteUser = Subscriber;
          setSubscriber([...remoteUser]);
        });
      };
      
      const subscribeLeft = () => {
        session.on('streamDestroyed', (event) => {
          // remove the stream from subscriber array
          deleteSubscriber(event.stream.streamManager);
        });
      };

      const deleteSubscriber = (streamManager) => {
        let subs = Subscriber;
        let idx = subs.indexOf(streamManager, 0);
        if (idx > -1) {
          subs.splice(idx, 1);
          setSubscriber([...subs]);
        }
      };

      useEffect(() => {
        // useEffect is executed upon first render when session is undefined.
        // We avoid this execution.
        if (session === undefined)
          return;

        // On every new Stream received...
        session.on('streamCreated', (event) => {
          let subscriber = session.subscribe(event.stream, undefined);
          // Update the state with the new subscriber
          let subs = Subscriber;
          subs.push(subscriber);
          setSubscriber([...subs]);      
        });

        subscribeStateChange();
        subscribeLeft();

        getToken(SessionId).then(token => {
          
          session.connect(token, { clientData: localStorage.getItem('nickName') })
          .then(() => {
            let publisher = OV.initPublisher('', {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: false,
              resolution: '640x480',
              frameRate: 30,
              insertMode: 'APPEND',
              mirror: false,
            });
            
            setPublisher(publisher);
            session.publish(publisher);
          })
          .catch(error => {
            console.log("There was an error connecting to the session:", error.code, error.message);
          });
        });
    
      }, [session]);
      
      const changeSpotlight = name => {
        console.log("이름", name)
        // console.log("이르음", JSON.parse(publisher?.stream.connection.data).clientData);
        // const temp = [...Publisher.filter(data => 
        //   JSON.parse(data?.stream.connection.data).clientData === name)]

        // console.log("temp", temp);
        
        // setPublisher(...Subscriber.filter(data => 
        //   JSON.parse(data?.stream.connection.data).clientData === name));

        // setSubscriber([...Subscriber.filter(data => 
        //   JSON.parse(data?.stream.connection.data).clientData !== name), ...Publisher])

    };


      return { leaveSession, publisher:Publisher, subscriber:Subscriber, changeSpotlight };

};

export default useOpenVidu;
