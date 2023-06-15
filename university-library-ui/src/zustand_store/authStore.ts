import {create} from "zustand";
import {api} from "../services";
import jwt from 'jwt-decode';
import {User} from "../type";

interface AuthStore {
  token: string | null;
  user: User | null;
  auth: (email: string, password: string) => Promise<void>;
  getUser: () => User | null;
}

const authStore = create<AuthStore>((set, get) => {
  return ({
    token: null,
    user: null,
    async auth(email: string, password: string) {
      const response = await api<{ token: string }>({
        url: '/auth/login',
        method: 'POST',
        status: 200,
        data: {
          email,
          password,
        },
      });

      if (response) {
        const user = jwt(response.data.token);
        console.log(user);
        console.log(response.data.token);
        set({token: response.data.token, user: user as User});
        localStorage.setItem('token', response.data.token);
      } else
        throw new Error(JSON.stringify(response));
    },
    getUser(){
      return get().user;
    }
  });
});

export default authStore;
