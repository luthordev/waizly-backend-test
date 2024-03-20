import type { Request, Response } from "express";
import { Users } from "../entity/Users";
import { AppDataSource as db } from "../data-source";

const UserRepo = db.getRepository(Users);

export async function GetUser(req: Request, res: Response) {
  try {
    const posts = await UserRepo.find({ relations: ["posts"] });

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Error retrieving users" });
  }
}

export async function AddUser(req: Request, res: Response) {
  try {
    const { name, username, password, role } = req.body;

    if (!name || !username || !password)
      return res.send({ status: "failed", message: "Body Required." });

    const newUser = await UserRepo.create({
      name,
      username,
      password,
      role,
    });
    newUser.hashPassword();
    const add = await UserRepo.save(newUser);

    res.status(200).json({
      status: "success",
      message: "user has been added.",
      data: add,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ status: "failed", message: "Error creating user" });
  }
}

export async function UpdateUser(req: Request, res: Response) {
  try {
    const { id } = req.query;
    const data = req.body;
    const jwtPayload = res.locals.jwtPayload;

    if (jwtPayload.role != "admin" && jwtPayload.userId != id)
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized." });

    if (!id) return res.send({ status: "failed", message: "id Required." });

    if (!data) return res.send({ status: "failed", message: "Body Required." });

    UserRepo.update(id, data);

    res.status(200).json({
      status: "success",
      message: "user has been updated.",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ status: "failed", message: "Error updating user" });
  }
}

export async function DeleteUser(req: Request, res: Response) {
  try {
    const { id } = req.query;

    const jwtPayload = res.locals.jwtPayload;

    if (jwtPayload.role != "admin" && jwtPayload.userId != id)
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized." });

    if (!id) return res.send({ status: "failed", message: "id Required." });

    UserRepo.delete(id);

    res.status(200).json({
      status: "success",
      message: "user has been deleted.",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ status: "failed", message: "Error deleting user" });
  }
}
