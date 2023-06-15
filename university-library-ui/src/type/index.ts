export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userRoleId: number;
  type: string;
}

export type Post = {
  id: number;
  name: string;
  description: string;
  userId: number;
}

export type PostFull = {
  id: number;
  name: string;
  description: string;
  user: {
    id: number,
    firstName: string,
    lastName: string,
  }
}

export type CreateUser = {
  firstName: string;
  lastName: string;
  userRoleId: number;
  email: string;
  password: string;
}

export type CreatePost = {
  name: string;
  description: string;
}
