import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schemas/comments.schema';
import { UsersService } from 'src/users/users.service';

interface AuthorizedRequest extends Request {
    user: {
        nickname: string
        email: string
    }
}

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment.name) private commentsModel: Model<CommentDocument>,
                private readonly userService: UsersService,
                @Inject(REQUEST) private readonly request: AuthorizedRequest
    ) {}

    async createComment(commentDto: CreateCommentDto): Promise<Comment> {
        const userNickname = this.request.user.nickname;

        const user = await this.userService.getOneBy('nickname', userNickname);

        if (!user) {
            throw new UnauthorizedException('The user doesn\'t exist');
        }

        const newComment = new this.commentsModel({
            ...commentDto,
            author: user
        });

        return await newComment.save();
    }

    async getAll(query): Promise<Comment[]> {
        return await this.commentsModel.find(query).populate('author').exec();
    }

    async getOne(query): Promise<Comment> {
        return await this.commentsModel.findOne(query).exec();
    }

    async updateOne(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        return await this.commentsModel.findByIdAndUpdate(id, updateCommentDto);
    }

    async removeOne(id: string): Promise<Comment> {
        return await this.commentsModel.findByIdAndRemove(id);
    }
}
