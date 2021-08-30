import { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
 
// const response = await axios.get(`http://localhost:8080/api/posts?postType=${postType}&page=${page}`);

const useQuery = (url) => {
  const history = useHistory();
  const [apiData, setApiData] = useState();

  useEffect(async() => {
    const response = await axios.get(url);

    const { status, data  } = response;

    if (status > 400) {
      history.replace(history.location.pathname, {
      errorStatusCode: status,
      });
    } else {
      setApiData(data);
    }
    
  }, [url]);

  return apiData;
};

export default useQuery;



// import { useState, useEffect} from "react";
// import { useHistory } from "react-router-dom";
// import axios from 'axios';
 

// const useQuery = (url) => {
//   const history = useHistory();
//   const [apiData, setApiData] = useState();

//   useEffect(async() => {
//                   // const response = await axios.get(`http://localhost:8080/api/posts?postType=${postType}&page=${page}`);
//     console.log("여기는 쿼리", url)
//     fetch(url)
//       .then((data) => data.json())
//       .then(({ code, status, ...apiData }) => {
//         if (code > 400) {
//           history.replace(history.location.pathname, {
//           errorStatusCode: code,
//           });
//         } else {
//           setApiData(apiData);
//         }
//       });
//   }, [url]);

//   return { data: apiData };
// };

// export default useQuery;


