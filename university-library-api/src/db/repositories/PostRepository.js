import _ from 'lodash';
import BaseRepository from 'db/repositories/BaseRepository';
import models from 'db/models';

class PostRepository extends BaseRepository {
  constructor() {
    super(models && models.post);

    this.attributes = ['id', 'name', 'description'];
  }

  getBaseIncludes(attributes) {
    return [
      {
        model: models.user,
        attributes: _.uniq(['id', 'firstName', 'lastName', ...(attributes?.user || [])]),
      },
    ];
  }

  async getItemById(postId, options = {}) {
    const post = await this.source.findOne({
      where: {
        id: postId,
      },
      include: this.getBaseIncludes(options.includeAttributes),
      ...options,
      attributes: options.attributes || this.attributes,
    });

    return post;
  }
}

export default new PostRepository();
