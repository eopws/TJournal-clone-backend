import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment, CommentSchema } from './schemas/comments.schema';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UsersModule,
    MongooseModule.forFeature([
      {name: Comment.name, schema: CommentSchema}
    ])
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
