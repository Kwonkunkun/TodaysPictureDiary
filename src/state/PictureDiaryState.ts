import { atom } from "recoil";

export default atom<Array<PictureDiary> | undefined>({
  key: "PictureDiaryState",
  default: undefined,
});
