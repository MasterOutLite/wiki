import PERMISSIONS from './permissions';

const roles = {
  admin: {
    id: 1,
    key: 'admin',
    permissions: [
      PERMISSIONS.POSTS_CREATE,
      PERMISSIONS.POSTS_DELETE,
      PERMISSIONS.POSTS_READ,
      PERMISSIONS.POSTS_UPDATE,
      PERMISSIONS.USERS_CREATE,
      PERMISSIONS.USERS_DELETE,
      PERMISSIONS.USERS_READ,
      PERMISSIONS.USERS_UPDATE,
    ],
  },
  member: {
    id: 2,
    key: 'member',
    permissions: [
      PERMISSIONS.POSTS_CREATE,
      PERMISSIONS.POSTS_DELETE,
      PERMISSIONS.POSTS_READ,
      PERMISSIONS.POSTS_UPDATE,
      PERMISSIONS.USERS_READ,
    ],
  },
};

export default {
  roles,
};
