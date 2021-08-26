import axios from 'axios';

const quest = () => {
    return questionData;
};

const answer = () => {
    return answerData;
};

const rootComment = (page) => {
    return rootCommentData;
};

const childComment = (page) => {
    if (page === 1){
        return commentData;

    } else {
        return commentData2;
    }
};


const postApi = {

    fetchAnswer: async(postId, currentPage) => {
        console.log("currentPage", currentPage)
        try {
            // const response = await axios.get(`/replies/{postId}`);
            const answerData = await answer();

            return answerData;
    
        } catch (error) {
            console.log("fetchAnswer", error);
        }
        
    },

    fetchQuestion: async(postId) => {

        try {
            // const response = await axios.get(`/posts/{postId}`);
            const qusetionData = await quest();

            return qusetionData;
    
        } catch (error) {
            console.log("fetchPost", error);
        }
        
    },


    fetchComment: async(endpoint, id, page=1) => {
        console.log("endpoint", endpoint)
        try {
            //임시
            if (endpoint === 'postComments'){
                const response = await rootComment();
                return response;
            } else {
                // const endpoint = `/${COMMENT_ENDPOINT}/${id}?page=${page}`;
                const response = await childComment(page);
                return response;
            }

            // postComments/<int: postId> 루트 코멘트
            // const response = await axios.get(`/${endpoint}/${id}`);
            // replyComments/<Long: replyId> 답글에 달린 코멘트
            // const response = await axios.get(`/${endpoint}/${id}`);


        } catch (error) {
            console.log("fetchComment", error);
        }
    },


    fetchCommentRegister: async(comment) => {

        try {
            // const response = await axios.post(`/postComments`);
            const response = true;

            return response;
    
        } catch (error) {
            console.log("fetchAnswer", error);
        }
        
    },

    fetchDelete: async(url) => {

        console.log("url",url);
        
        try {
            // const response = await axios.delete(`/${url}`);
            const response = true;

            return response;
    
        } catch (error) {
            console.log("fetchDelete", error);
        }
        
    },

};

const questionData = [
    {
        "postId":6,
        "postTitle":"가렌은 정말 좋은 챔피언인가요?",
        "postContent":"가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 그가 대대로 데마시아와 데마시아의 이상을 수호하는 임무를 맡은 크라운가드 가문의 자손이기 때문은 아니다. 가렌은 마법 저항력을 갖춘 방어구와 거대한 대검으로 무장하고, 언제라도 마법사에 맞서 정당한 검으로 진정한 칼바람을 일으킬 준비가 되어 있다.가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다. 선봉대 내에서 인망이 두터울 뿐 아니라 심지어 적에게도 존경을 받지만, 그가 대대로 데마시아와 데마시아의 이상을 수호하는 임무를 맡은 크라운가드 가문의 자손이기 때문은 아니다. 가렌은 마법 저항력을 갖춘 방어구와 거대한 대검으로 무장하고, 언제라도 마법사에 맞서 정당한 검으로 진정한 칼바람을 일으킬 준비가 되어 있다.가렌은 불굴의 선봉대를 이끄는 고결하고 자긍심 강한 전사다.",
        "postType": "category1",
        "userId":"가렌",
    },
];


const answerData = [
  
    {
        "star": 0,
        "replyId":12,
        "postid": 6,
        "userId":"니코",
        "grade": "Gold",
        "replyContent":"오랜 세월 잊힌 바스타야의 한 부족 출신인 니코는 다른 이의 모습을 빌려 어느 무리에든 뒤섞일 수 있으며, 심지어 상대의 감정을 흡수하여 적과 아군을 한눈에 구분할 수 있다. 그 누구도 니코가 어디 있는지, 정체가 무엇인지 확신할 수 없지만, 악의를 가지고 접근하는 자는 원초적 영혼 마법의 무시무시한 힘과 함께 그녀의 진정한 모습을 보게 될 것이다. "
    },
    
    
    {
        "star": 0,
        "replyId":13,
        "postid": 6,
        "userId":"니달리",
        "grade": "Gold",
        "replyContent":"깊은 정글에서 자라난 니달리는 자신의 형태를 흉포한 쿠거로 자유자재로 변화시킬 수 있는 추적의 달인이다. "
    
    },

    {
        "star": 0,
        "replyId":14,
        "postid": 6,
        "userId":"레오나",
        "grade": "Gold",
        "replyContent":"솔라리 성전사 레오나는 천공의 검과 여명의 방패로 타곤 산을 수호한다. 레오나의 몸은 태양의 불길로 가득하며, 피부는 별의 광채로 빛나고, 눈동자는 천체들의 기운으로 불타오른다."
    },
    

];


const rootCommentData = [
    {   "postCommentId":7,
        "userId":"세라핀님의 댓글",
        "postCommentContent":"자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다.자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다."
    }
];


const commentData = [

    {
        "replyCommentId":8,
        "userId":"레오나님의 댓글",
        "replyCommentContent":"솔라리 성전사 레오나는 천공의 검과 여명의 방패로 타곤 산을 수호한다. 레오나의 몸은 태양의 불길로 가득하며, 피부는 별의 광채로 빛나고, 눈동자는 천체들의 기운으로 불타오른다."
    },
    
    {
        "replyCommentId":9,
        "userId":"럭스님의 댓글",
        "replyCommentContent":"럭산나 크라운가드는 데마시아 인으로, 마법 능력을 가진 자를 공포와 의심을 담은 편협한 시선으로 보는 환경에서 태어났다. "
    
    },
    
    
    {
        "replyCommentId":10,
        "userId":"세라핀님의 댓글",
        "replyCommentContent":"자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다.자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다."
    
    },
    {
        "replyCommentId":11,
        "userId":"레오나1님의 댓글",
        "replyCommentContent":"솔라리 성전사 레오나는 천공의 검과 여명의 방패로 타곤 산을 수호한다. 레오나의 몸은 태양의 불길로 가득하며, 피부는 별의 광채로 빛나고, 눈동자는 천체들의 기운으로 불타오른다."
    },
    
    {
        "replyCommentId":12,
        "userId":"럭스님2의 댓글",
        "replyCommentContent":"럭산나 크라운가드는 데마시아 인으로, 마법 능력을 가진 자를 공포와 의심을 담은 편협한 시선으로 보는 환경에서 태어났다. "
    
    },
    
    
    {
        "replyCommentId":13,
        "userId":"세라핀3님의 댓글",
        "replyCommentContent":"자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다.자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다."
    
    }
];

const commentData2 = [

    {
        "replyCommentId":18,
        "userId":"레오나님의 댓글",
        "replyCommentContent":"솔라리 성전사 레오나는 천공의 검과 여명의 방패로 타곤 산을 수호한다. 레오나의 몸은 태양의 불길로 가득하며, 피부는 별의 광채로 빛나고, 눈동자는 천체들의 기운으로 불타오른다."
    },
    
    {
        "replyCommentId":19,
        "userId":"럭스님의 댓글",
        "replyCommentContent":"럭산나 크라운가드는 데마시아 인으로, 마법 능력을 가진 자를 공포와 의심을 담은 편협한 시선으로 보는 환경에서 태어났다. "
    
    },
    
    
    {
        "replyCommentId":20,
        "userId":"세라핀1님의 댓글",
        "replyCommentContent":"자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다.자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다."
    
    },
    {
        "replyCommentId":21,
        "userId":"레오나11님의 댓글",
        "replyCommentContent":"솔라리 성전사 레오나는 천공의 검과 여명의 방패로 타곤 산을 수호한다. 레오나의 몸은 태양의 불길로 가득하며, 피부는 별의 광채로 빛나고, 눈동자는 천체들의 기운으로 불타오른다."
    },
    
    {
        "replyCommentId":22,
        "userId":"럭스님12의 댓글",
        "replyCommentContent":"럭산나 크라운가드는 데마시아 인으로, 마법 능력을 가진 자를 공포와 의심을 담은 편협한 시선으로 보는 환경에서 태어났다. "
    
    },
    
    
    {
        "replyCommentId":23,
        "userId":"세라핀13님의 댓글",
        "replyCommentContent":"자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다.자운 출신의 부모를 둔 세라핀은 필트오버에서 태어나 다른 사람의 영혼의 소리를 들을 수 있다. 세상이 그녀에게 노래하고 그녀 또한 답가를 불렀다. 어린 시절에는 이 소리가 그녀를 억눌렀지만 이제 그녀는 영감을 위해 소리를 이끌어내고 혼돈을 협화음으로 바꿀 수 있게 되었다. 세라핀은 두 도시를 위해 공연하며 시민들에게 그들은 혼자가 아니고 함께일 때 더 강하며, 그들의 잠재력은 무한하다는 것을 일깨워준다."
    
    }
];

export default postApi;