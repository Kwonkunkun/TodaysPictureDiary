import { atom } from "recoil";
import { BlockUser } from "types/user";

export default atom<Array<BlockUser> | null>({
  key: "BlockUser",
  default: null,
});
