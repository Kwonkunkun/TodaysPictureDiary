import { atom } from "recoil";

export default atom<OrderOption>({
  key: "SeletedFilterOption",
  default: "date",
});
