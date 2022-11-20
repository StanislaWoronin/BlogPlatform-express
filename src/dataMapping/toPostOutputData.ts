import {PostConstructor} from "../types/posts-constructor";

export const postOutputType = (postsBD: PostConstructor) => {
    return {
        id: postsBD.id,
        title: postsBD.title,
        shortDescription: postsBD.shortDescription,
        content: postsBD.content,
        blogId: postsBD.blogId,
        blogName: postsBD.blogName,
        createdAt: postsBD.createdAt
    }
}

export const postOutputBeforeCreate = (postsBD: PostConstructor) => {
    return {
        id: postsBD.id,
        title: postsBD.title,
        shortDescription: postsBD.shortDescription,
        content: postsBD.content,
        blogId: postsBD.blogId,
        blogName: postsBD.blogName,
        createdAt: postsBD.createdAt,
        extendedLikesInfo: {
            myStatus: 'None',
            likesCount: 0,
            dislikesCount: 0,
            newestLikes: []
        }
    }
}