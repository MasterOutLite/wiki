import authStore from "../zustand_store/authStore";
import {getInfoURL, loginURL, logoutURL, postsURL, usersURL} from "./apiURL";
import userStore from "../zustand_store/userStore";
import {CreatePost, CreateUser, Post, User} from "../type";

const nonAuth = {data: 'Your token is null or you are not authorized', status: 404};

export async function login(email: string, password: string) {
  const login = {
    email: email,
    password: password
  };

  const response = await fetch(loginURL,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    });
  const data = await response.json();

  // const setToken = authStore.getState().setToken;
  // setToken(data.token);

  return {data, status: response.status};
}

export async function logout() {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(logoutURL,
    {
      method: 'POST',
      headers: {

        'Authorization': `Bearer ${token}`
      },
    });
  const data = await response.json();

  //const setToken = authStore.getState().setToken;
  //setToken('null');

  return {data, status: response.status};
}

export async function getInfoAuth() {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(getInfoURL,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  const data = await response.json();


  return {data, status: response.status};
}

export async function createUser(user: CreateUser) {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(usersURL,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

  const data = await response.json();
  return {data, status: response.status};
}

export async function getAllUsers() {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(usersURL,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  const data = await response.json() as User[];

  const setUser = userStore.getState().setUsers;
  setUser(data);
  return {data, status: response.status};
}

export async function getUsersById(id: number) {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(usersURL + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  const data = await response.json() as User;
  return {data, status: response.status};
}

export async function updateInfo(id: number, dataUser: { firstname: string, lastname: string }) {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(usersURL + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: "PUT",
      body: JSON.stringify(dataUser)
    });
  const data = await response.json();
  return {data, status: response.status};
}

export async function updateUserRole(id: number, role: { userRoleId: number }) {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(usersURL + `/${id}/role`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: "PUT",
      body: JSON.stringify(role)
    });
  const data = await response.json();
  return {data, status: response.status};
}

export async function deleteUserById(id: number) {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(usersURL + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      method: "DELETE",
    });
  const data = await response.json();
  return {data, status: response.status};
}

export async function getAllPosts() {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(postsURL,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
  const data = await response.json() as Post[];
  return {data, status: response.status};
}

export async function getPostsById(id: number) {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(postsURL + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  const data = await response.json() as Post;
  return {data, status: response.status};
}

export async function createPost(post: CreatePost) {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(postsURL,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    });

  const data = await response.json();
  return {data, status: response.status};
}

export async function updatePost(id: number, post: CreatePost) {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(postsURL + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(post),
    });
  const data = await response.json() as Post;
  return {data, status: response.status};
}

export async function deletePostById(id: number) {
  const token = authStore.getState().token;
  if (!token)
    return nonAuth;

  const response = await fetch(postsURL + '/' + id,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      method: 'DELETE',
    });
  const data = await response.json();
  return {data, status: response.status};
}
