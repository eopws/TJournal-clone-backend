import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: false })
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User

  @Prop({ required: true })
  header: string

  @Prop({ required: true })
  content: string

  @Prop({ required: true })
  slug: string

  @Prop({ default: false })
  isDraft: boolean

  @Prop({ default: 0 })
  likes: number

  @Prop({ default: 0 })
  views: number

  @Prop({ type: Date, default: Date.now })
  createdAt: Date
}

export const PostSchema = SchemaFactory.createForClass(Post);
