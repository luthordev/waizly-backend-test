import type { Request, Response } from "express";
import { Posts } from "../entity/Posts";
import { AppDataSource as db } from "../data-source";

const PostsRepo = db.getRepository(Posts);

export async function GetPost(req: Request, res: Response) {
  try {
    const posts = await PostsRepo.find({
      relations: ["created_by", "comments", "comments.created_by"],
    });

    res.status(200).json({ status: "success", posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error retrieving posts" });
  }
}

export async function AddPost(req: Request, res: Response) {
  try {
    const { title, content, created_by } = req.body;

    if (!title || !content || !created_by)
      return res.send({ status: "failed", message: "Body Required." });

    const newPost = await PostsRepo.create({ title, content, created_by });
    const add = await PostsRepo.save(newPost);

    res.json({
      status: "success",
      message: "post has been added.",
      data: add,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Error creating post" });
  }
}

export async function UpdatePost(req: Request, res: Response) {
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

    PostsRepo.update(id, data);

    res.json({
      status: "success",
      message: "post has been updated.",
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ status: "failed", message: "Error updating post" });
  }
}

export async function DeletePost(req: Request, res: Response) {
  try {
    const { id } = req.query;
    const jwtPayload = res.locals.jwtPayload;

    if (jwtPayload.role != "admin" && jwtPayload.userId != id)
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized." });

    if (!id) return res.send({ status: "failed", message: "id Required." });

    PostsRepo.delete(id);

    res.json({
      status: "success",
      message: "post has been deleted.",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ status: "failed", message: "Error deleting post" });
  }
}
