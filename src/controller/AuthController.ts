import type { Request, Response } from "express";
import { Users } from "../entity/Users";
import { AppDataSource as db } from "../data-source";
import * as jwt from "jsonwebtoken";

const UserRepo = db.getRepository(Users);

export async function Login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    let user: Users;

    user = await UserRepo.findOneOrFail({
      where: { username },
      select: { id: true, username: true, password: true, role: true },
    });

    if (!user.validate(password))
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized." });

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({ status: "success", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "failed", message: error });
  }
}
