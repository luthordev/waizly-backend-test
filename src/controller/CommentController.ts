import type { Request, Response } from "express";
import { Comments } from "../entity/Comments";
import { AppDataSource as db } from "../data-source";

const CommentRepo = db.getRepository(Comments);

export async function GetComment(req: Request, res: Response) {
  try {
    const comments = await CommentRepo.find({
      relations: ["posts", "created_by"],
    });

    res.status(200).json({ status: "success", comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error retrieving comments" });
  }
}

export async function AddComment(req: Request, res: Response) {
  try {
    const { comment, postId, created_by } = req.body;

    if (!comment || !postId || !created_by)
      return res.send({ status: "failed", message: "Body Required." });

    const newComment = await CommentRepo.create({
      comment,
      posts: postId,
      created_by,
    });

    const add = await CommentRepo.save(newComment);

    res.json({
      status: "success",
      message: "comment has been added.",
      data: add,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Error creating comment" });
  }
}

export async function UpdateComment(req: Request, res: Response) {
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

    CommentRepo.update(id, data);

    res.json({
      status: "success",
      message: "comment has been updated.",
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Error updating comment" });
  }
}

export async function DeleteComment(req: Request, res: Response) {
  try {
    const { id } = req.query;
    const jwtPayload = res.locals.jwtPayload;

    if (jwtPayload.role != "admin" && jwtPayload.userId != id)
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized." });

    if (!id) return res.send({ status: "failed", message: "id Required." });

    CommentRepo.delete(id);

    res.json({
      status: "success",
      message: "comment has been deleted.",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ status: "failed", message: "Error deleting post" });
  }
}
