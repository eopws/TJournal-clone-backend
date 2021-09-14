import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

import { Post } from 'src/posts/schemas/posts.schema';
import { User } from 'src/users/schemas/users.schema';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: false })
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: Post

  @Prop({ required: true })
  content: string

  @Prop({ default: 0 })
  likes: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', nullable: true })
  parent?: Comment

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', nullable: true })
  children?: Comment[]

  @Prop({ type: Date, default: Date.now })
  createdAt: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
