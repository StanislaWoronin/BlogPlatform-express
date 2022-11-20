import {Router} from "express";
import {deleteCommentByIdMiddleware,
        commentsLikesMiddleware,
        updateCommentMiddleware} from "../middlewares/commentsRouter-middleware";
import {container} from "../composition-root";
import {CommentsController} from "../controllers/comments-controller";

//const commentsController = ioc.getInstance<CommentsController>(CommentsController)
const commentsController = container.resolve(CommentsController)

export const commentsRouter = Router({})

commentsRouter.get('/:id', commentsController.getCommentById.bind(commentsController))

commentsRouter.put('/:id',
    ...updateCommentMiddleware, commentsController.updateCommentByCommentId.bind(commentsController))

commentsRouter.put('/:id/like-status',
    ...commentsLikesMiddleware, commentsController.updateLikeStatus.bind(commentsController))

commentsRouter.delete('/:id',
    ...deleteCommentByIdMiddleware, commentsController.deleteCommentByCommentId.bind(commentsController))