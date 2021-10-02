import { useState, useCallback, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { getToken } from '../api/openViduApi';
import api from '../api/api.js';

function useOpenVidu({ sessionId }) {
    
    const [session, setSession] = useState(undefined);
    const [SessionId, setSessionId] = useState(sessionId);
    const [Subscriber, setSubscriber] = useState([]);
    const [publisher, setPublisher] = useState(undefined);
    const [UserName, setUserName] = useState(undefined);
    const [OV, setOV] = useState(undefined);



    const leaveSession = useCallback(() => {
        if (session)
            session.disconnect();

        setOV(undefined);
        setSession(undefined);
        setSessionId(SessionId);
        setSubscriber([]);
        setPublisher(undefined);
      }, [session]);


      
      useEffect(() => {
        window.addEventListener('beforeunload', leaveSession);

        // init
        if (!OV){
          setOV(new OpenVidu());
        }

        return () => {
          window.removeEventListener('beforeunload', leaveSession);

        }
      }, [leaveSession]);
    
      // init session
      useEffect(() => {
        if (!OV) return;
        setSession(OV.initSession());
      }, [OV]);
      
      
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
          
          session.connect(token, { clientData: UserName })
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
    
      }, [session, OV, SessionId]);
      
      return { leaveSession, publisher, subscriber:Subscriber };

};

export default useOpenVidu;
