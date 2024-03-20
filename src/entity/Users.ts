import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Posts } from "./Posts";
import { Comments } from "./Comments";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  role: "admin" | "user";

  @Column({ default: new Date().toISOString() })
  created_at: Date;

  @OneToMany(() => Posts, (post) => post.created_by)
  posts: Posts[];

  @OneToMany(() => Comments, (comment) => comment.id)
  comments: Comments[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  validate(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
