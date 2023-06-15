import helpers from 'helpers';
import {Op} from 'sequelize';

class BaseRepository {
  constructor(source) {
    this.source = source;
  }

  setSource(source) {
    this.source = source;
  }

  getILikeWhereCondition(fieldName, value = null) {
    if (helpers.isEmpty(value)) return {};

    return {
      [fieldName]: {
        [Op.iLike]: `%${value}%`,
      },
    };
  }

  async getAll(query = {}, distinct = true) {
    if (helpers.isEmpty(query.attributes)) {
      delete query.attributes;
    }

    const {rows, count} = await this.source.findAndCountAll({
      ...query,
      distinct,
    });

    return helpers.transform.toArray(rows).map(item => item.get());
  }

  async getItemById(id, options = {}) {
    return this.source.findByPk(id, options);
  }

  async getItemByField(fieldName, fieldValue, options = {}) {
    return this.source.findOne({
      where: {[fieldName]: fieldValue},
      ...options,
    });
  }

  async getItemsByField(fieldName, fieldValue, options = {}) {
    return this.source.findAll({
      where: {[fieldName]: fieldValue},
      ...options,
    });
  }

  async createItem(data, options = {}) {
    return this.source.create(data, options);
  }

  async updateItem(id, data, options = {}) {
    let result = await this.getItemById(id, options);
    if (!result) {
      throw new helpers.errors.NotFound();
    }

    result = await result.update(data, options);
    if (!result) {
      throw new helpers.errors.BadQuery();
    }

    return this.getItemById(id, options);
  }

  async updateEntity(entity, options = {}) {
    if (!entity.changed()) {
      return entity;
    }
    await entity.save(options);

    return entity;
  }

  async deleteItem(id, options = {}, force = false) {
    // individualHooks: true - needs for trigger afterDestroy hook
    return this.source.destroy({where: {id}, individualHooks: true, force}, options);
  }
}

module.exports = BaseRepository;
