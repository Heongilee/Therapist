

export const PATH = "mypage";
export const CATEGORY_LIST = ["myPosts","myReplies","myPostComments","myReplyComments"];
export const CATEGORY_HANGUL_LIST = {"myPosts":"내가 쓴 글",
"myReplies":"내가 쓴 답글",
"myPostComments":"내가 쓴 게시글 댓글",
"myReplyComments": "내가 쓴 답글 댓글"};
export const CATEGORY_DIC = {"myPosts":["postTitle","postContent"],
                            "myPostComments":["id","content"],
                            "myReplies":["postTitle","postContent"]};


export const POST_DATA = {"myPosts":"userPosts",
                            "myPostComments":"userPostComments",
                            "myReplies":["postTitle","postContent"]};

export const ENDPOINT =  "/mypage";

export const ININIAL_POSTTYPE = "myPosts";

