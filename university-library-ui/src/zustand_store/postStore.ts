import {create} from "zustand";
import {Post, PostFull, User} from "../type";
import {api} from "../services";

interface PostStore {

  posts?: { [key: number]: Post };
  postIds: number[];
  setPosts: (post: Post[]) => Post[];
  addPosts: (post: Post) => void;

  getAllPost: () => Promise<Post[] | undefined>;
  getPostById: (id: number) => Promise<PostFull | null>;
  getPost: (id: number) => Post | undefined;
}

const postStore = create<PostStore>((set, get) => {
  return ({
    postIds: [],
    setPosts(posts: Post[]) {
      set({posts: posts});
      return posts;
    },
    addPosts(post: Post) {
      const posts = get().posts;
      const postIds = get().postIds;
      if (!posts)
        set({posts: []});
      if (posts)
        posts[post.id] = post;
      postIds.push(post.id);
    },
    getPost(id: number) {
      const post = get().posts;
      if (post)
        return post[id];

      return post;
    }
    ,
    async getAllPost() {
      const response = await api<Post[]>({
        url: '/posts',
        status: 200,
      });

      if (response) {
        const posts = [] as { [key: number]: Post };
        const postIds = [] as number[];
        const responseData = response.data;
        responseData.forEach(post => {
          posts[post.id] = post;
          postIds.push(post.id);
        });
        set({posts: posts, postIds: postIds});
        return responseData;
      }
    },
    async getPostById(id: number) {
      const response = await api<PostFull>({
        url: `/posts/${id}`,
        status: 200,
      });

      if (response) {
        const post = response.data as PostFull;
        return post;
      }
      return null;
    },
  });
});

export default postStore;
