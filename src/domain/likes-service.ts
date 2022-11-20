import {injectable} from "inversify";
import {LikesRepository} from "../repositories/likes-repository";

@injectable()
export class LikesService {
    constructor(protected likesRepository: LikesRepository) {}

    async getReactionAndReactionCount(id: string, userId: string) {
        let reaction = 'None'
        if (userId) {
            const result = await this.likesRepository.giveUserReaction(id, userId)
            if (result) {
                reaction = result.status
            }
        }

        const likesCount = await this.likesRepository.getLikeReactionsCount(id)
        const dislikesCount = await this.likesRepository.getDislikeReactionsCount(id)

        return {reaction, likesCount, dislikesCount}
    }
}