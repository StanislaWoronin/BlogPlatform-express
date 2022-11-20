import {NewestLikesModel} from "./newestLikesModel";

export class PostConstructor {
    constructor(
        public id: string,
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string,
        public createdAt: string
    ) {}
}

export type PostsConstructor = PostConstructor[]

export class PostViewModel {
    constructor(
        public id: string,
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string,
        public createdAt: string,
        public extendedLikesInfo: {
            myStatus: string,
            likesCount: number,
            dislikesCount: number,
            newestLikes: NewestLikesModel[]
        }
    ) {}
}