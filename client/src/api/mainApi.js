import axios from 'axios';

const temp = () => {
    return data;
};

// const API = "http://ec2-184-73-134-45.compute-1.amazonaws.com:8080/api/main/posts"

const mainApi = {

    fetchRecentBoard: async() => {
        try {
            const response = await axios.get('http://localhost:8080/api/main/posts');

            // const response = await axios.get(API);
            // const { data } = await axios.get(`${API}/main/posts`);
            // const response = await temp();
            const { data } = response;
            return data;
    
        } catch (error) {
            console.log("fetchRecentBoard", error)
        }
        
    },


    fetchVoiceRoom: async() => {

        try {
            // const response = await axios.get(`/api/main/posts`);
            // const response = await temp();
            
            const response = [1,2,3,4,5,6,7,8]

            return response;
    
        } catch (error) {
            console.log("fetchVoiceRoom", error)
        }
    },

    fetchCreateRoom: async() => {

        try {
            // const response = await axios.get(`/api/main/posts`);
            // const response = await temp();
            
            const response = true;

            return response;
    
        } catch (error) {
            console.log("fetchCreateRoom", error)
        }
    }

}

export default mainApi;
    


const data = [
    {
        "postId": 60,
        "postType": "서폿",
        "postTitle": "소라카",
        "postContent": "소라카는 귀엽다",
        "replyLength": 1
    },
    {
        "postId": 61,
        "postType": "미드",
        "postTitle": "럭스",
        "postContent": "럭스 예쁘다",
        "replyLength": 2
    },
    
    {
        "postId": 62,
        "postType": "탑",
        "postTitle": "가렌",
        "postContent":"가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 그가 대대로 데마시아와 데마시아의 이상을 수호하는 임무를 맡은 크라운가드 가문의 자손이기 때문은 아니다. 가렌은 마법 저항력을 갖춘 방어구와 거대한 대검으로 무장하고, 언제라도 마법사에 맞서 정당한 검으로 진정한 칼바람을 일으킬 준비가 되어 있다.가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 그가 대대로 데마시아와 데마시아의 이상을 수호하는 임무를 맡은 크라운가드 가문의 자손이기 때문은 아니다. 가렌은 마법 저항력을 갖춘 방어구와 거대한 대검으로 무장하고, 언제라도 마법사에 맞서 정당한 검으로 진정한 칼바람을 일으킬 준비가 되어 있다.가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서",
        "replyLength": 3
    },

    {
        "postId": 63,
        "postType": "서폿",
        "postTitle": "니코",
        "postContent":"오랜 세월 잊힌 바스타야의 한 부족 출신인 니코는 다른 이의 모습을 빌려 어느 무리에든 뒤섞일 수 있으며, 심지어 상대의 감정을 흡수하여 적과 아군을 한눈에 구분할 수 있다. 그 누구도 니코가 어디 있는지, 정체가 무엇인지 확신할 수 없지만, 악의를 가지고 접근하는 자는 원초적 영혼 마법의 무시무시한 힘과 함께 그녀의 진정한 모습을 보게 될 것이다. ",
        "replyLength": 4
    },

    {
        "postId": 64,
        "postType": "정글",
        "postTitle": "니달리",
        "postContent":"깊은 정글에서 자라난 니달리는 자신의 형태를 흉포한 쿠거로 자유자재로 변화시킬 수 있는 추적의 달인이다. ",
        "replyLength": 5
    },

    {
        "postId": 65,
        "postType": "서폿",
        "postTitle": "레오나",
        "postContent":"솔라리 성전사 레오나는 천공의 검과 여명의 방패로 타곤 산을 수호한다. 레오나의 몸은 태양의 불길로 가득하며, 피부는 별의 광채로 빛나고, 눈동자는 천체들의 기운으로 불타오른다.",
        "replyLength": 6
    },
];
