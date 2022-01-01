import { selector } from "recoil";
import PictureDiaryState from "./PictureDiaryState";
import SeletedOrderOptionState from "./SeletedOrderOptionState";

export default selector<Array<PictureDiary> | undefined>({
  key: "OrderedPictureDiaryState",
  get: ({ get }) => {
    const orderOption = get(SeletedOrderOptionState);
    const pictureDiaries = get(PictureDiaryState);

    if (!pictureDiaries) {
      return pictureDiaries;
    }

    switch (orderOption) {
      case "date":
        return pictureDiaries
          .concat()
          .sort((a: PictureDiary, b: PictureDiary) => {
            return new Date(a.time).getTime() - new Date(b.time).getTime();
          });
      case "recent":
        return pictureDiaries
          .concat()
          .sort((a: PictureDiary, b: PictureDiary) => {
            return new Date(b.time).getTime() - new Date(a.time).getTime();
          });

      default:
        return pictureDiaries;
    }
  },
});
