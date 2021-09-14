import { Controller, Post, Get, Query, Body, Put, Delete, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './schemas/comments.schema';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    createPost(@Body() commentDto: CreateCommentDto): Promise<Comment> {
        return this.commentsService.createComment(commentDto);
    }

    @Get('all')
    async getAll(@Query() query): Promise<Comment[]> {
        return this.commentsService.getAll(query);
    }

    @Get('one')
    async getOne(@Query() query): Promise<Comment> {
        return this.commentsService.getOne(query);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updateOne(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
        return this.commentsService.updateOne(id, updateCommentDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    removeOne(@Param('id') id: string): Promise<Comment> {
        return this.commentsService.removeOne(id);
    }
}
