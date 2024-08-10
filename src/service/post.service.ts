import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entity/post.entity';
import { Comment } from '../entity/comment.entity';
import { Like } from '../entity/like.entity';

@Provide()
export class PostService {
  @InjectEntityModel(PostEntity)
  postModel: Repository<PostEntity>;

  @InjectEntityModel(Comment)
  commentModel: Repository<Comment>;

  @InjectEntityModel(Like)
  likeModel: Repository<Like>;

  async createPost(post: PostEntity) {
    return await this.postModel.save(post);
  }

  async getAllPostByXqq_id(value: any): Promise<PostEntity[]> {
    return await this.postModel.find({
      where: { xqq_id: value },
    });
  }

  async getPostById(id: number): Promise<PostEntity | undefined> {
    return await this.postModel.findOne({ where: { id } });
  }

  async createComment(comment: Comment) {
    return await this.commentModel.save(comment);
  }

  async getAllCommentByPost_id(value: any): Promise<Comment[]> {
    return await this.commentModel.find({
      where: { post_id: value },
    });
  }

  async updatePostById(
    id: number,
    updatedCommentNumber: number
  ): Promise<number> {
    const result = await this.postModel.update(id, {
      comment_number: updatedCommentNumber,
    });
    return result.affected; // 返回受影响的行数
  }

  async findLikeByPostIdAndCreator(
    creator: string,
    post_id: number
  ): Promise<Like | undefined> {
    return await this.likeModel.findOne({
      where: {
        creator: creator,
        post_id: post_id,
      },
    });
  }

  async createLike(like: Like) {
    return await this.likeModel.save(like);
  }

  async updatePostLikeById(
    id: number,
    updatedLikeNumber: number
  ): Promise<number> {
    const post = await this.postModel.findOne({ where: { id } });
    const result = await this.postModel.update(id, {
      like_number: post.like_number + updatedLikeNumber,
    });
    return result.affected; // 返回受影响的行数
  }

  async getAllPostByPoster(name: any): Promise<PostEntity[]> {
    return await this.postModel.find({
      where: { poster_name: name },
    });
  }

  async getAllCommentByCreator(name: any): Promise<Comment[]> {
    return await this.commentModel.find({
      where: { creator: name },
    });
  }

  async getAllLikePostByCreator(name: string): Promise<PostEntity[]> {
    // 获取所有点赞记录
    const likes = await this.likeModel.find({
      where: { creator: name },
    });
    // 提取所有点赞记录中的 post_id 列表
    const postIds = likes.map(like => like.post_id);
    // 使用 postIds 列表批量获取帖子内容
    const posts = await Promise.all(
      postIds.map(async postId => await this.getPostById(postId))
    );
    // 过滤掉未找到的帖子
    return posts.filter(post => post !== undefined) as PostEntity[];
  }

  async getAllLikeByName(name: string): Promise<Like[]> {
    // 获取这个人发布的所有帖子
    const posts = await this.postModel.find({
      where: { poster_name: name },
    });

    // 提取所有帖子的 id
    const postIds = posts.map(post => post.id);

    // 对于每个帖子的 id，获取该帖子的所有点赞信息
    const likesPromises = postIds.map(
      async postId =>
        await this.likeModel.find({
          where: { post_id: postId },
        })
    );

    // 等待所有点赞信息的 Promise 完成
    const allLikes = await Promise.all(likesPromises);

    // 使用 reduce 方法将所有点赞信息合并成一个列表
    return allLikes.reduce((acc, val) => acc.concat(val), []);
  }

  async getAllCommentByName(name: string): Promise<Comment[]> {
    const posts = await this.postModel.find({
      where: { poster_name: name },
    });
    const postIds = posts.map(post => post.id);
    const commentsPromises = postIds.map(
      async postId =>
        await this.commentModel.find({
          where: { post_id: postId },
        })
    );
    const allComments = await Promise.all(commentsPromises);
    return allComments.reduce((acc, val) => acc.concat(val), []);
  }
}
