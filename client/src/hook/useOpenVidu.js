import { useState, useCallback, useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { getToken } from '../api/openViduApi';
import { useHistory } from "react-router-dom";
import api from '../api/api.js';

function useOpenVidu({ sessionId }) {
    
    const [session, setSession] = useState(undefined);
    const [SessionId, setSessionId] = useState(sessionId);
    const [Subscriber, setSubscriber] = useState([]);
    const [Publisher, setPublisher] = useState(undefined);
    const [Spotlight, setSpotlight] = useState(undefined);
    const currentSpotLight = useRef(0);

    const [OV, setOV] = useState(undefined);

    const history = useHistory();
    
    const leaveSession = useCallback(async() => {
   
      if (session)
            session.disconnect();

        // 방장이 현재 누구인지
        const getSessionEndPoint = `/openvidu/session/${SessionId}`;
        const { sessionModerator } = await api.fetchGetSession(getSessionEndPoint);
        
        // 나혼자 있는 경우
        if (Subscriber.length < 1){
            const deleteEndPoint=`/openvidu/session/${SessionId}`;
            await api.fetchDeleteSession(deleteEndPoint);
        } else {
          
          // 방장이 나자신이면  + 방장교체
          if (sessionModerator === localStorage.getItem('nickName')){
            const changeModEndPoint=`/openvidu/session/${SessionId}`;
            const userData = { sessionModerator: localStorage.getItem('nickName') };
            await api.fetchChangeModerator(changeModEndPoint, userData);

          } 
            const exitEndPoint=`/openvidu/session/${SessionId}/exit`;
            await api.fetchRoomCount(exitEndPoint);
            
            // const deleteEndPoint=`/openvidu/session/${SessionId}`;
            // await api.fetchDeleteSession(deleteEndPoint);

        }

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

        if (currentSpotLight.current === idx + 1){
          setSpotlight(undefined);
        }
        
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
      
     


      return { leaveSession, 
        publisher:Publisher, 
        subscriber:Subscriber, 
        spotlight:Spotlight,
        currentSpotLight:currentSpotLight,
        setSpotlight
      };


};

export default useOpenVidu;
