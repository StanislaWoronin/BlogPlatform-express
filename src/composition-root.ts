import "reflect-metadata"
import {BlogsRepository} from "./repositories/blogs-repository";
import {CommentsRepository} from "./repositories/comments-repository";
import {PostsRepository} from "./repositories/posts-repository";
import {SecurityRepository} from "./repositories/security-repository";
import {UsersRepository} from "./repositories/users-repository";
import {AuthService} from "./domain/auth-service";
import {BlogsService} from "./domain/blogs-service";
import {CommentsService} from "./domain/comments-servise";
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

// const objects: any = []
//
// const blogsRepository = new BlogsRepository()
// const commentsRepository = new CommentsRepository()
// const emailConfirmationRepository = new EmailConfirmationRepository()
// const ipAddressRepository = new IpAddressRepository()
// const jwtBlackList = new JWTBlackList()
// const likesRepository = new LikesRepository()
// const postsRepository = new PostsRepository()
// const securityRepository = new SecurityRepository()
// const usersRepository = new UsersRepository()
//
// objects.push(
//     blogsRepository,
//     commentsRepository,
//     emailConfirmationRepository,
//     ipAddressRepository,
//     jwtBlackList,
//     likesRepository,
//     postsRepository,
//     securityRepository,
//     usersRepository)
//
// const authService = new AuthService(usersRepository)
// const blogsService = new BlogsService(blogsRepository)
// const jwtService = new JWTService(jwtBlackList)
// const commentsService = new CommentsService(
//     jwtService,
//     commentsRepository,
//     likesRepository)
// const postsService = new PostsService(postsRepository, blogsRepository)
// const securityService = new SecurityService(
//     jwtService,
//     securityRepository)
// const usersService = new UsersService(usersRepository, authService)
//
// objects.push(
//     authService,
//     blogsService,
//     jwtService,
//     commentsService,
//     postsService,
//     securityService,
//     usersService)
//
// const authController = new AuthController(
//     authService,
//     jwtService,
//     securityService,
//     usersService)
// const blogsController = new BlogsController(blogsService, postsService)
// const commentsController = new CommentsController(commentsService, usersService)
// const postController = new PostsController(postsService, commentsService)
// const securityController = new SecurityController(securityService)
// const testingController = new TestingController(
//     blogsRepository,
//     commentsRepository,
//     emailConfirmationRepository,
//     ipAddressRepository,
//     jwtBlackList,
//     likesRepository,
//     postsRepository,
//     securityRepository,
//     usersRepository)
// const usersController = new UsersController(usersService)
//
// objects.push(
//     authController,
//     blogsController,
//     commentsController,
//     postController,
//     securityController,
//     testingController,
//     usersController)
//
// export const ioc = {
//     getInstance<T>(ClassType: any) {
//         const targetInstance = objects.find((o: any) => o instanceof ClassType)
//         return targetInstance as T
//     }
// }

export const container = new Container()
container.bind(AuthController).toSelf()
container.bind<AuthService>(AuthService).toSelf()

container.bind(BlogsController).to(BlogsController)
container.bind<BlogsService>(BlogsService).to(BlogsService)
container.bind<BlogsRepository>(BlogsRepository).to(BlogsRepository)

container.bind(CommentsController).to(CommentsController)
container.bind<CommentsService>(CommentsService).to(CommentsService)
container.bind<CommentsRepository>(CommentsRepository).to(CommentsRepository)

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