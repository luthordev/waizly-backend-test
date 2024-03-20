import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Users } from "./Users";
import { Comments } from "./Comments";

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => Comments, (comment) => comment.posts)
  comments: Comments[];

  @Column({ default: new Date().toISOString() })
  created_at: Date;

  @ManyToOne(() => Users, (user) => user.id)
  created_by: Users;
}
