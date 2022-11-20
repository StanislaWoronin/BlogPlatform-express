import {Request, Response, NextFunction} from "express";
import bcrypt from "bcrypt";
import {UserDBConstructor} from "../../types/user-constructor";
import {container} from "../../composition-root";
import {UsersRepository} from "../../repositories/users-repository";

const usersRepository = container.resolve(UsersRepository)

export const checkCredential = async (req: Request, res: Response, next: NextFunction) => {

    const user: UserDBConstructor | null = await usersRepository.giveUserByLoginOrEmail(req.body.loginOrEmail)

    if (!user) {
        return res.sendStatus(401)
    }

    const passwordEqual = await bcrypt.compare(req.body.password, user!.passwordHash)

    if (!passwordEqual) {
        return res.sendStatus(401)
    }

    req.user = user
    return next()
}