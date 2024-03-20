import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";
import { Posts } from "./Posts";

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => Posts, (post) => post.comments)
  posts: Posts;

  @ManyToOne(() => Users, (user) => user.comments)
  created_by: Users;

  @Column({ default: new Date().toISOString() })
  created_at: Date;
}
