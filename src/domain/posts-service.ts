import {LikesRepository} from "../repositories/likes-repository";
import {PostsRepository} from "../repositories/posts-repository";
import {BlogsRepository} from "../repositories/blogs-repository";
import {JWTService} from "../application/jws-service";
import {LikesService} from "./likes-service";
import {PostConstructor,
        PostViewModel} from "../types/posts-constructor";
import {ContentPageConstructor} from "../types/contentPage-constructor";
import {paginationContentPage} from "../paginationContentPage";
import {postOutputBeforeCreate, postOutputType} from "../dataMapping/toPostOutputData";
import {injectable} from "inversify";
import {UsersRepository} from "../repositories/users-repository";

@injectable()
export class PostsService {
    constructor(protected jwtService: JWTService,
                protected likesService: LikesService,
                protected postsRepository: PostsRepository,
                protected blogsRepository: BlogsRepository,
                protected likesRepository: LikesRepository,
                protected usersRepository: UsersRepository) {}

    async createNewPost(title: string,
                        shortDescription: string,
                        content: string,
                        blogId: string): Promise<PostConstructor | null> {

        const newPost = new PostConstructor(
            String(+new Date()),
            title,
            shortDescription,
            content,
            blogId,
            await this.giveBlogName(blogId),
            new Date().toISOString()
        )

        const createdPost = await this.postsRepository.createNewPost(newPost)

        if (!createdPost) {
            return null
        }

        return postOutputBeforeCreate(createdPost)
    }

    async giveBlogName(id: string): Promise<string> {
        const blog = await this.blogsRepository.giveBlogById(id)

        if (!blog) {
            return ''
        }

        return blog.name
    }

    async givePostsPage(sortBy: string,
                        sortDirection: 'asc' | 'desc',
                        pageNumber: string,
                        pageSize: string,
                        blogId: string,
                        token?: string | undefined): Promise<ContentPageConstructor> {

        const postsDB = await this.postsRepository.givePosts(sortBy, sortDirection, pageNumber, pageSize, blogId)
        const totalCount = await this.postsRepository.giveTotalCount(blogId)
        const userId = await this.jwtService.getUserIdFromToken(token)
        const posts = await Promise.all(postsDB.map(async p => await this.addLikesInfoForPost(p, userId)))

        return paginationContentPage(pageNumber, pageSize, posts, totalCount)
    }

    async givePostById(postId: string, token?: string): Promise<PostViewModel | null> {
        const post = await this.postsRepository.givePostById(postId)

        if (!post) {
            return null
        }

        const userId = await this.jwtService.getUserIdFromToken(token)
        return await this.addLikesInfoForPost(post, userId)
    }

    async updatePost(id: string,
                     title: string,
                     shortDescription: string,
                     content: string,
                     blogId: string): Promise<boolean> {

        return await this.postsRepository.updatePost(id, title, shortDescription, content, blogId)
    }

    async updateLikesInfo(userId: string, commentId: string, likeStatus: string): Promise<boolean> {
        const addedAt = new Date().toISOString()
        const login = await this.usersRepository.giveUserByIdOrLoginOrEmail(userId)

        if (!login) {
            return false
        }

        return await this.likesRepository.updateUserReaction(commentId, userId, likeStatus, addedAt, login.login)
    }

    async deletePostById(id: string): Promise<boolean> {
        return await this.postsRepository.deletePostById(id)
    }

    private async addLikesInfoForPost(post: PostConstructor, userId: string | null): Promise<PostViewModel> {
        const result = await this.likesService.getReactionAndReactionCount(post.id, userId!)
        const newestLikes = await this.likesRepository.getNewestLikes(post.id)

        return {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: {
                myStatus: result.reaction,
                likesCount: result.likesCount,
                dislikesCount: result.dislikesCount,
                newestLikes: newestLikes!
            }
        }
    }
}