import { Controller, Post, Inject, Body, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { PostService } from '../service/post.service';
import { PostEntity } from '../entity/post.entity';
import { Comment } from '../entity/comment.entity';
import { Like } from '../entity/like.entity';

@Controller('/post')
export class XqqController {
  @Inject()
  postService: PostService;

  @Inject()
  ctx: Context;

  @Post('/create')
  async createPost(@Body() post: PostEntity) {
    return this.postService.createPost(post);
  }

  @Get('/get_all_post')
  async getAllPost(@Query('xqq_id') xqq_id: number) {
    return this.postService.getAllPostByXqq_id(xqq_id);
  }
  @Get('/get_post_by_id')
  async getPostById(@Query('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Post('/comment')
  async createComment(@Body() comment: Comment) {
    await this.postService.createComment(comment);
    const comments = await this.postService.getAllCommentByPost_id(
      comment.post_id
    );
    return this.postService.updatePostById(comment.post_id, comments.length);
  }

  @Get('/get_all_comment')
  async getAllComment(@Query('post_id') post_id: number) {
    return this.postService.getAllCommentByPost_id(post_id);
  }

  @Get('/get_comment_number')
  async getCommentById(@Query('id') id: number) {
    return (await this.postService.getAllCommentByPost_id(id)).length;
  }

  @Post('/like')
  async likePost(@Body() like_message: Like) {
    const like = await this.postService.findLikeByPostIdAndCreator(
      like_message.creator,
      like_message.post_id
    );

    console.log(like, like_message);

    if (like === undefined || like === null) {
      await this.postService.createLike(like_message);
      await this.postService.updatePostLikeById(like_message.post_id, 1);
      return true;
    }
    return false;
  }
}
