export class LikesConstructor {
    constructor(
        public parentId: string,
        public userId: string,
        public status: string,
        public addedAt: string,
        public login: string
    ) {}
}