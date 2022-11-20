import {NextFunction, Request, Response} from "express";
import {container} from "../../composition-root";
import {JWTService} from "../../application/jws-service";
import {UsersService} from "../../domain/users-service";

const jwtService = container.resolve(JWTService)
const usersService = container.resolve(UsersService)

export const authentication = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        return res.sendStatus(401)
    }

    const accessToken = req.headers.authorization.split(' ')[1]

    const userInfo = await jwtService.giveTokenPayload(accessToken)

    if (!userInfo) {
        return res.sendStatus(401)
    }

    const user: any = await usersService.giveUserByIdOrLoginOrEmail(userInfo.userId)

    if (!user) {
        return res.sendStatus(401)
    }

    req.user = user
    next()
}