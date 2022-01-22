type PictureDiary = {
  id: string;
  time: string;
  weather: Weather;
  title: string;
  base64Img: string;
  content: string;
  isShowOff?: boolean;
};

type ShowOffPictureDiary = {
  id: string;
  time: string;
  weather: Weather;
  title: string;
  base64Img: string;
  content: string;
  //자랑하기시 밑에 있는 데이터 추가해서 사용
  uid: string;
  likes: number;
  creatorName: string;
  createAt: string;
};

type OrderOption = "date" | "recent";

type Weather = "sun" | "rain" | "snow" | "cloud";
