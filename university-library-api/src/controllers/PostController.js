import HTTP from 'constants/http';
import PostService from 'services/PostService';
import validation, {post} from 'validation';

class PostController {
  async getAll(req, res, next) {
    const data = await PostService.getAll(req.body);

    res.status(HTTP.ok).json(data);
  }

  async create(req, res, next) {
    await validation(req.body, post.createPost);

    const item = await PostService.create(req.body, req.body.userId || req.currentUser.id);

    res.status(HTTP.created).json(item);
  }

  async getItem(req, res, next) {
    const item = await PostService.getItem(req.params.postId);

    res.status(HTTP.ok).json(item);
  }

  async update(req, res, next) {
    await validation(req.body, post.updatePost);
    const item = await PostService.update(req.params.postId, req.body);

    res.status(HTTP.ok).json(item);
  }

  async delete(req, res, next) {
    await PostService.delete(req.params.postId);

    res.status(HTTP.noContent).end();
  }
}

export default new PostController();
