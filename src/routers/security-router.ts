import {Router} from "express";
import {container} from "../composition-root";
import {SecurityController} from "../controllers/security-controller";
import {refreshTokenValidation} from "../middlewares/validation-middleware/refreshToken-validation";

export const securityRouter = Router({})

//const securityController = ioc.getInstance<SecurityController>(SecurityController)
const securityController = container.resolve(SecurityController)

securityRouter.get('/devices',
    refreshTokenValidation, securityController.getAllActiveSessions.bind(securityController))

securityRouter.delete('/devices',
    refreshTokenValidation, securityController.deleteAllActiveSessions.bind(securityController))

securityRouter.delete('/devices/:deviceId',
    refreshTokenValidation, securityController.deleteActiveSessionsById.bind(securityController))