import {Router} from "express";
import {container} from "../composition-root";
import {PostsController} from "../controllers/posts-controller";
import {createCommentForPostsRouterMiddleware,
        postsRouterMiddleware,
        getPostsRouterMiddleware,
        deletePostsRouterMiddleware} from "../middlewares/postsRouter-middleware";

export const postsRouter = Router({})

//const postsController = ioc.getInstance<PostsController>(PostsController)
const postsController = container.resolve(PostsController)

postsRouter.get('/',
    ...getPostsRouterMiddleware,postsController.getPostsPage.bind(postsController))

postsRouter.get('/:id', postsController.getPostByPostId.bind(postsController))

postsRouter.get('/:id/comments',
    ...getPostsRouterMiddleware, postsController.getCommentsPageByPostId.bind(postsController))

postsRouter.post('/',
    postsRouterMiddleware, postsController.createPost.bind(postsController))

postsRouter.post('/:id/comments',
    createCommentForPostsRouterMiddleware, postsController.createCommentByPostId.bind(postsController))

postsRouter.put('/:id',
    postsRouterMiddleware, postsController.updatePostByPostId.bind(postsController))

postsRouter.delete('/:id',
    deletePostsRouterMiddleware, postsController.deletePostByPostId.bind(postsController))