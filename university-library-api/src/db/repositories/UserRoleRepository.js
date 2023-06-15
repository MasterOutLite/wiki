import BaseRepository from 'db/repositories/BaseRepository';
import models from 'db/models';

class UserRoleRepository extends BaseRepository {
  constructor() {
    super(models && models.userRole);
  }
}

export default new UserRoleRepository();
