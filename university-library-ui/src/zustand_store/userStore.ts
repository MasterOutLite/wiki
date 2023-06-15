import {create} from "zustand";
import {User} from "../type";

interface UserStore {

  users: User[];
  setUsers: (users: User[]) => User[];
}

const userStore = create<UserStore>((set, get) => {
  return ({
    users: [],
    setUsers(users: User[]) {
      set({users: users});
      return users;
    },

  });
});

export default userStore;
