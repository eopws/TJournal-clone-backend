import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './schemas/posts.schema';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Post()
    createPost(@Body() postDto: CreatePostDto): Promise<PostEntity> {
        return this.postService.createPost(postDto);
    }

    @Get('all')
    getAll(@Query() query): Promise<PostEntity[]> {
        return this.postService.getAll(query);
    }

    @Get(':slug')
    getOne(@Param('slug') slug: string): Promise<PostEntity> {
        return this.postService.getOne(slug);
    }

    @Put(':id')
    updateOne(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostEntity> {
        return this.postService.updateOne(id, updatePostDto);
    }

    @Delete(':id')
    removeOne(@Param('id') id: string): Promise<PostEntity> {
        return this.postService.removeOne(id);
    }
}
