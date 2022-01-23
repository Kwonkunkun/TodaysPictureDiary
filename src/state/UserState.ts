import { atom } from "recoil";
import { User } from "types/user";

export default atom<User | null>({
  key: "User",
  default: null,
});
