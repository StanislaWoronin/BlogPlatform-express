import "reflect-metadata"
import {BlogsRepository} from "./repositories/blogs-repository";
import {CommentsRepository} from "./repositories/comments-repository";
import {EmailConfirmationRepository} from "./repositories/emailConfirmation-repository";
import {JWTBlackList} from "./repositories/jwtBlackList";
import {IpAddressRepository} from "./repositories/ipAddress-repository";
import {LikesRepository} from "./repositories/likes-repository";
import {PostsRepository} from "./repositories/posts-repository";
import {SecurityRepository} from "./repositories/security-repository";
import {UsersRepository} from "./repositories/users-repository";
import {AuthService} from "./domain/auth-service";
import {BlogsService} from "./domain/blogs-service";
import {CommentsService} from "./domain/comments-servise";
import {JWTService} from "./application/jws-service";
import {PostsService} from "./domain/posts-service";
import {SecurityService} from "./domain/security-service";
import {UsersService} from "./domain/users-service";
import {UsersController} from "./controllers/users-controller";
import {AuthController} from "./controllers/auth-controller";
import {BlogsController} from "./controllers/blogs-controller";
import {CommentsController} from "./controllers/comments-controller";
import {PostsController} from "./controllers/posts-controller";
import {SecurityController} from "./controllers/security-controller";
import {TestingController} from "./controllers/testing-controller";
import {Container} from "inversify";
import {LikesService} from "./domain/likes-service";

export const container = new Container()
container.bind(AuthController).toSelf()
container.bind<AuthService>(AuthService).toSelf()

container.bind(BlogsController).to(BlogsController)
container.bind<BlogsService>(BlogsService).to(BlogsService)
container.bind<BlogsRepository>(BlogsRepository).to(BlogsRepository)

container.bind(CommentsController).to(CommentsController)
container.bind<CommentsService>(CommentsService).to(CommentsService)
container.bind<CommentsRepository>(CommentsRepository).to(CommentsRepository)

container.bind<EmailConfirmationRepository>(EmailConfirmationRepository).to(EmailConfirmationRepository)

container.bind<IpAddressRepository>(IpAddressRepository).to(IpAddressRepository)

container.bind<JWTService>(JWTService).to(JWTService)
container.bind<JWTBlackList>(JWTBlackList).to(JWTBlackList)

container.bind<LikesService>(LikesService).to(LikesService)
container.bind<LikesRepository>(LikesRepository).to(LikesRepository)

container.bind(PostsController).to(PostsController)
container.bind<PostsService>(PostsService).to(PostsService)
container.bind<PostsRepository>(PostsRepository).to(PostsRepository)

container.bind(SecurityController).to(SecurityController)
container.bind<SecurityService>(SecurityService).to(SecurityService)
container.bind<SecurityRepository>(SecurityRepository).to(SecurityRepository)

container.bind(TestingController).to(TestingController)

container.bind(UsersController).to(UsersController)
container.bind<UsersService>(UsersService).to(UsersService)
container.bind<UsersRepository>(UsersRepository).to(UsersRepository)