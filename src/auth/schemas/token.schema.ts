import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type TokenDocument = Token & Document;

@Schema({ timestamps: false })
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ required: true })
  refreshToken: string
}

export const TokenSchema = SchemaFactory.createForClass(Token);
