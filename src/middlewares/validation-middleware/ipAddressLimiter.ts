import {NextFunction, Request, Response} from "express";
import {container} from "../../composition-root";
import {IpAddressRepository} from "../../repositories/ipAddress-repository";

const ipAddressRepository = container.resolve(IpAddressRepository)

export const ipAddressLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip
    const endpoint = req.url
    const connectionAt = Date.now()

    await ipAddressRepository.createNewConnection(ip, endpoint, connectionAt)
    const connectionsCount = await ipAddressRepository.giveConnectionCount(ip, endpoint, connectionAt)

    if (connectionsCount > 5) {
        return res.sendStatus(429)
    }

    return next()
}