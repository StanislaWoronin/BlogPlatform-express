import {Router} from "express";
import {container} from "../composition-root";
import {BlogsController} from "../controllers/blogs-controller";
import {createPostForBlogsRouterMiddleware,
        deleteBlogsRouterMiddleware,
        getBlogsRouterMiddleware,
        getPostForBlogsRouterMiddleware,
        postBlogsRouterMiddleware,
        putBlogsRouterMiddleware} from "../middlewares/blogsRouterMiddleware";

//const blogsController = ioc.getInstance<BlogsController>(BlogsController)
const blogsController = container.resolve(BlogsController)

export const blogsRouter = Router({})

blogsRouter.get('/',
    ...getBlogsRouterMiddleware, blogsController.getBlogsPage.bind(blogsController))

blogsRouter.get('/:id', blogsController.getBlogById.bind(blogsController))

blogsRouter.get('/:id/posts',
    ...getPostForBlogsRouterMiddleware, blogsController.getPostsPageByBlogId.bind(blogsController))

blogsRouter.post('/',
    ...postBlogsRouterMiddleware, blogsController.createBlog.bind(blogsController))

blogsRouter.post('/:id/posts', // blogId
    ...createPostForBlogsRouterMiddleware, blogsController.createPostByBlogId.bind(blogsController))

blogsRouter.put('/:id',
    ...putBlogsRouterMiddleware, blogsController.updateBlogById.bind(blogsController))

blogsRouter.delete('/:id',
    ...deleteBlogsRouterMiddleware, blogsController.deleteBlogById.bind(blogsController))