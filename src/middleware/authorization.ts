import { Request, Response, NextFunction } from "express";
import { AppDataSource as db } from "../data-source";
import { Users } from "../entity/Users";
const UserRepo = db.getRepository(Users);

export function Authorization(roles: Array<string>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;

    let user: Users;
    try {
      user = await UserRepo.findOneOrFail({ where: id });
    } catch (id) {
      res.status(401).json({ status: "failed", message: "Unauthorized." });
    }

    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();
  };
}
