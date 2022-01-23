import { User } from "types/user";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
export const getAppDateStringFormatWith = (ISODateFormatString: string) => {
  const date = new Date(ISODateFormatString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const getLottieSourceWith = (weather: Weather) => {
  switch (weather) {
    case "sun":
      return require("@assets/lotties/sun.json");
    case "rain":
      return require("@assets/lotties/rain.json");
    case "cloud":
      return require("@assets/lotties/cloud.json");
    case "snow":
      return require("@assets/lotties/snow.json");
    default:
      return require("@assets/lotties/sun.json");
  }
};

export const getClientStringWith = (weather: Weather) => {
  switch (weather) {
    case "sun":
      return "맑음";
    case "rain":
      return "비";
    case "cloud":
      return "구름";
    case "snow":
      return "눈";
    default:
      return "맑음";
  }
};

export const getSortedPictureDiariesWith = (
  pictureDiaries: Array<PictureDiary>
) => {
  const result = pictureDiaries.sort((a: PictureDiary, b: PictureDiary) => {
    return new Date(a.time).getTime() - new Date(b.time).getTime();
  });

  return result;
};

export const formatData = (data: Array<any>, numColumns: number) => {
  let result = [...data];
  const numberOfFullRows = Math.floor(result.length / numColumns);

  let numberOfElementsLastRow = result.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    result.push({ empty: true });
    numberOfElementsLastRow++;
  }

  return result;
};

//이메일 체크 정규식
export const isNotEmail = (asValue: string) => {
  const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return !regExp.test(asValue);
};

//6자 이상
export const isNotPassword = (asValue: string) => {
  return !(asValue.length >= 6);
};

export const getAppUserWith = (firebaseUser: FirebaseAuthTypes.User | null) => {
  if (firebaseUser === null) {
    return null;
  }

  const result: User = {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName ?? "없음",
  };
  return result;
};

export const getShowOffPictureDiaryWith = (
  pictureDiary: PictureDiary,
  uid: string,
  likes: number,
  creatorName: string,
  createAt: string
) => {
  const result: ShowOffPictureDiary = {
    ...pictureDiary,
    uid: uid,
    likes: likes,
    creatorName: creatorName,
    createAt: createAt,
  };

  return result;
};

export const getRandomString = (length: number) => {
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};
