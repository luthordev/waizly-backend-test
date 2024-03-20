import { Authentication } from "./middleware/authentication";
import { Authorization } from "./middleware/authorization";
import {
  GetPost,
  AddPost,
  UpdatePost,
  DeletePost,
} from "./controller/PostController";
import {
  AddComment,
  GetComment,
  UpdateComment,
  DeleteComment,
} from "./controller/CommentController";
import {
  GetUser,
  AddUser,
  UpdateUser,
  DeleteUser,
} from "./controller/UserController";

import { Login } from "./controller/AuthController";

export type RouteType = {
  method: String;
  path: String;
  controller: Function;
  middleware?: Function | Function[];
};

const authRoute: RouteType[] = [
  {
    method: "post",
    path: "/api/login",
    controller: Login,
  },
];

const userRoute: RouteType[] = [
  {
    method: "get",
    path: "/api/user/get",
    controller: GetUser,
    middleware: [Authentication, Authorization(["admin"])],
  },
  {
    method: "post",
    path: "/api/user/add",
    controller: AddUser,
    middleware: [Authentication, Authorization(["admin"])],
  },
  {
    method: "patch",
    path: "/api/user/update",
    controller: UpdateUser,
    middleware: [Authentication, Authorization(["admin", "user"])],
  },
  {
    method: "delete",
    path: "/api/user/delete",
    controller: DeleteUser,
    middleware: [Authentication, Authorization(["admin", "user"])],
  },
];

const commentRoute: RouteType[] = [
  {
    method: "get",
    path: "/api/comment/get",
    controller: GetComment,
    middleware: [Authentication, Authorization(["admin", "user"])],
  },
  {
    method: "post",
    path: "/api/comment/add",
    controller: AddComment,
    middleware: [Authentication, Authorization(["admin", "user"])],
  },
  {
    method: "patch",
    path: "/api/comment/update",
    controller: UpdateComment,
    middleware: [Authentication, Authorization(["admin", "user"])],
  },
  {
    method: "delete",
    path: "/api/comment/delete",
    controller: DeleteComment,
    middleware: [Authentication, Authorization(["admin", "user"])],
  },
];

const postRoute: RouteType[] = [
  {
    method: "get",
    path: "/api/post/get",
    controller: GetPost,
    middleware: [Authentication, Authorization(["admin", "user"])],
  },
  {
    method: "post",
    path: "/api/post/add",
    controller: AddPost,
    middleware: [Authentication, Authorization(["admin", "user"])],
  },
  {
    method: "patch",
    path: "/api/post/update",
    controller: UpdatePost,
    middleware: [Authentication, Authorization(["admin", "user"])],
  },
  {
    method: "delete",
    path: "/api/post/delete",
    controller: DeletePost,
    middleware: [Authentication, Authorization(["admin", "user"])],
  },
];

export const routes: RouteType[] = [
  ...authRoute,
  ...userRoute,
  ...commentRoute,
  ...postRoute,
];
