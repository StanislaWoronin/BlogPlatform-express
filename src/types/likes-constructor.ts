export class LikesConstructor {
    constructor(
        public parentId: string,
        public userId: string,
        public login: string,
        public status: string,
        public addedAt: Date
    ) {}
}