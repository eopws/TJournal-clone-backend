import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: false })
export class User {
  @Prop({ default: '' })
  avatar: string

  @Prop({ unique: true, required: true })
  nickname: string

  @Prop({ unique: true, required: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: false })
  isActivated: boolean

  @Prop({ required: true })
  activationLink: string

  @Prop({ type: Date, default: Date.now })
  createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User);
