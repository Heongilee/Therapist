package com.projectTeam.therapist.boardService;

public interface BoardService {
//    public void writePost(MemberDto member);
    public void listAllPost();
    public void modifyPost(Long postId);
    public void removePost(Long postId);
//    public void writeComment(MemberDto member);
    public void modifyComment(Long commentId);
    public void removeComment(Long commentId);
}
