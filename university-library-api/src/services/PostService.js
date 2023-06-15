import {PostRepository} from 'db/repositories';
import helpers from 'helpers';

class PostService {
  async getAll() {
    return await PostRepository.getAll();
  }

  async getItem(postId) {
    const post = await PostRepository.getItemById(postId);

    if (!post) {
      throw new helpers.errors.NotFound();
    }

    return post;
  }

  async create(data = {}, authorId) {
    const {name, description} = data;

    const item = await PostRepository.createItem({
      name,
      description,
      userId: authorId,
    });

    return PostRepository.getItemById(item.id);
  }

  async update(postId, data = {}) {
    return await PostRepository.updateItem(postId, data);
  }

  async delete(postId = {}) {
    await PostRepository.deleteItem(postId);

    return true;
  }
}

export default new PostService();
