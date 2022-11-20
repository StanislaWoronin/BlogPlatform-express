import {Router} from "express";
import {container} from "../composition-root";
import {UsersController} from "../controllers/users-controller";
import {deleteUsersRouter,
        getUsersRouterMiddleware,
        postUsersRouterMiddleware} from "../middlewares/usersRouter-middleware";

export const usersRouter = Router({})

//const usersController = ioc.getInstance<UsersController>(UsersController)
const usersController = container.resolve(UsersController)

usersRouter.post('/',
    ...postUsersRouterMiddleware, usersController.createUser.bind(usersController))

usersRouter.get('/',
    ...getUsersRouterMiddleware, usersController.getUsersPage.bind(usersController))

usersRouter.delete('/:id',
    ...deleteUsersRouter, usersController.deleteUserById.bind(usersController))