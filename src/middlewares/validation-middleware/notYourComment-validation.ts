import {NextFunction, Request, Response} from "express";
import {container} from "../../composition-root";
import {CommentsService} from "../../domain/comments-servise";

const commentsService = container.resolve(CommentsService)

export const notYourComment = async (req: Request, res: Response, next: NextFunction) => {
    const comment = await commentsService.giveCommentById(req.params.id)

    if (!comment) {
        return res.sendStatus(404)
    }

    if (comment.userId !== req.user!.id) {
        return res.sendStatus(403) //	If try edit the comment that is not your own
    }

    next()
}