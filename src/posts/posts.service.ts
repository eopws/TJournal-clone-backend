import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as uuid from 'uuid';

import { GetAllQuery } from './requestTypes';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schemas/posts.schema';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

    async createPost(postDto: CreatePostDto): Promise<Post> {
        const newPost = new this.postModel({
            ...postDto,
            slug: ((postDto.header + '-' + uuid.v1()).replace(/ /g, '-'))
        });

        return await newPost.save();
    }

    async getAll(query: GetAllQuery): Promise<Post[]> {
        return await this.postModel.find(query).populate('author', 'nickname').exec();
    }

    async getOne(slug: string): Promise<Post> {
        return await this.postModel.findOne({slug}).populate('author', 'nickname').exec();
    }

    async getOneBy(key: string, value: any): Promise<Post> {
        return await this.postModel.findOne({[key]: value}).populate('author').exec();
    }

    async updateOne(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
        return await this.postModel.findByIdAndUpdate(id, updatePostDto);
    }

    async removeOne(id: string): Promise<Post> {
        return await this.postModel.findByIdAndRemove(id);
    }
}
