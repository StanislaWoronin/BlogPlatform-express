import {NextFunction, Request, Response} from "express";
import {container} from "../../composition-root";
import {JWTService} from "../../application/jws-service";
import {UsersService} from "../../domain/users-service";

const jwtService = container.resolve(JWTService)
const usersService = container.resolve(UsersService)

export const refreshTokenValidation = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.cookies.refreshToken) {
        return res.sendStatus(401)
    }

    const tokenInBlackList = await jwtService.checkTokenInBlackList(req.cookies.refreshToken)

    if (tokenInBlackList) {
        return res.sendStatus(401)
    }

    const tokenPayload = await jwtService.giveTokenPayload(req.cookies.refreshToken)

    if (!tokenPayload) {
        return res.sendStatus(401)
    }

    const user = await usersService.giveUserByIdOrLoginOrEmail(tokenPayload.userId)

    if (!user) {
        return res.sendStatus(401)
    }

    req.user = user
    req.body.tokenPayload = tokenPayload
    next()
}