import {v4 as uuidv4} from 'uuid';
import {CommentsRepository} from "../repositories/comments-repository";
import {CommentBDConstructor, CommentsBDType, CommentViewModel} from "../types/comment-constructor";
import {ContentPageConstructor} from "../types/contentPage-constructor";
import {UserDBConstructor} from "../types/user-constructor";
import {paginationContentPage} from "../paginationContentPage";
import {LikesRepository} from "../repositories/likes-repository";
import {JWTService} from "../application/jws-service";
import {injectable} from "inversify";
import {commentOutputBeforeCreate} from "../dataMapping/commentOutputBeforeCreate";
import {LikesService} from "./likes-service";

@injectable()
export class CommentsService {
    constructor(protected jwtService: JWTService,
                protected likesService: LikesService,
                protected commentsRepository: CommentsRepository,
                protected likesRepository: LikesRepository) {}

    async createNewComment(postId: string, comment: string, user: UserDBConstructor): Promise<CommentViewModel | null> {
        const commentId = uuidv4()

        let newComment = new CommentBDConstructor(
            commentId,
            comment,
            user.id,
            user.login,
            new Date().toISOString(),
            postId
        )

        try {
            await this.commentsRepository.createNewComment(newComment)
        } catch (e) {
            return null
        }

        return commentOutputBeforeCreate(newComment)
    }

    async updateComment(commentId: string, comment: string): Promise<boolean> {
        return await this.commentsRepository.updateComment(commentId, comment)
    }

    async giveCommentById(commentId: string, token?: string): Promise<CommentViewModel | null> {
        const comment = await this.commentsRepository.giveCommentById(commentId)

        if (!comment) {
            return null
        }

        const userId = await this.jwtService.getUserIdFromToken(token)
        return await this.addLikesInfoForComment(comment, userId)
    }

    async giveCommentsPage(sortBy: string,
                           sortDirection: 'asc' | 'desc',
                           pageNumber: string,
                           pageSize: string,
                           postId: string,
                           token?: string): Promise<ContentPageConstructor | null> {

        const commentsDB: CommentsBDType = await this.commentsRepository.giveComments(sortBy, sortDirection, pageNumber, pageSize, postId)
        const totalCount = await this.commentsRepository.giveTotalCount(postId)

        const userId = await this.jwtService.getUserIdFromToken(token)
        const comments = await Promise.all(commentsDB.map(async c => await this.addLikesInfoForComment(c, userId)))

        return paginationContentPage(pageNumber, pageSize, comments, totalCount)
    }

    async updateLikesInfo(userId: string, commentId: string, likeStatus: string): Promise<boolean> {
        const addedAt = new Date().toISOString()
        return await this.likesRepository.updateUserReaction(commentId, userId, likeStatus, addedAt)
    }

    async deleteCommentById(commentId: string): Promise<boolean> {
        return await this.commentsRepository.deleteCommentById(commentId)
    }

    private async addLikesInfoForComment (comment: CommentBDConstructor, userId: string | null) {
        const result = await this.likesService.getReactionAndReactionCount(comment.id, userId!)

        return {
            id: comment.id,
            content: comment.content,
            userId: comment.userId,
            userLogin: comment.userLogin,
            createdAt: comment.createdAt,
            likesInfo: {
                myStatus: result.reaction,
                likesCount: result.likesCount,
                dislikesCount: result.dislikesCount
            }
        }
    }
}