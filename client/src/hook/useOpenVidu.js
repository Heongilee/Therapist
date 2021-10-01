import { useState, useCallback, useEffect } from 'react';
import { OpenVidu } from 'openvidu-browser';
import { getToken } from '../api/openViduApi';
import api from '../api/api.js';

function useOpenVidu() {
    
    const [session, setSession] = useState(undefined);
    const [SessionId, setSessionId] = useState(undefined);
    const [subscriber, setSubscriber] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [UserName, setUserName] = useState(undefined);
    const [OV, setOV] = useState(undefined);
    const [isLocalVideoActive, setIsLocalVideoActive] = useState(false);



    const leaveSession = useCallback(() => {
        if (session)
            session.disconnect();
    
        setOV(undefined);
        setSession(undefined);
        setSessionId(SessionId);
        setSubscriber(undefined);
        setPublisher(undefined);
      }, [session]);




      useEffect(() => {
        window.addEventListener('beforeunload', leaveSession);
        


        // returned function will be called on component unmount 
        return () => {
          window.removeEventListener('beforeunload', leaveSession);
        }
      }, [leaveSession]);
    

      const sessionIdChangeHandler = (event) => {
        setSessionId(event.target.value);
      };
    
      
      const joinSession = (sessionId, userName) => {

        setSessionId(sessionId);
        setUserName(userName);
        
        // state won't be updated immediately. We need a callback for
        // when the state is updated. We use useEffect below for this reason.
        let OV = new OpenVidu();
        setOV(OV);
        setSession(OV.initSession());
      };
    

      useEffect(() => {
        // useEffect is executed upon first render when session is undefined.
        // We avoid this execution.
        if (session === undefined)
          return;
        console.log("sessiion", SessionId)
        // On every new Stream received...
        session.on('streamCreated', (event) => {
          let subscriber = session.subscribe(event.stream, undefined);
          // Update the state with the new subscriber
          setSubscriber(subscriber);
        });
        
        //`{\"clientData\":\"${Nickname}\",\"avatar\":\"assets/images/openvidu_globe.png\"}`
        // `{\"clientData\":\"${Nickname}\"}`
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
      
      return { joinSession, leaveSession, publisher, subscriber };

};

export default useOpenVidu;
