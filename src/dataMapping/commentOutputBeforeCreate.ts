import {CommentBDConstructor, CommentViewModel} from "../types/comment-constructor";

export const commentOutputBeforeCreate = (comment: CommentBDConstructor): CommentViewModel => {
    return {
        id: comment.id,
        content: comment.content,
        userId: comment.userId,
        userLogin: comment.userLogin,
        createdAt: comment.createdAt,
        likesInfo: {
            myStatus: 'None',
            likesCount: 0,
            dislikesCount: 0
        }
    }
}