import { default as AuthResolver } from "./auth";
import { default as UserResolver } from "./user";
import { default as CommentResolver } from "./comments";
import { default as IssueResolver } from "./issues";
import { default as WarehouseBoardItemResolver } from "./warehouseboarditems";
import { default as ProjectResolver } from "./project";

export const RESOLVERS = [
  AuthResolver,
  UserResolver,
  CommentResolver,
  IssueResolver,
  WarehouseBoardItemResolver,
  ProjectResolver,
];
