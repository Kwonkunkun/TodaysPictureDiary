type PictureDiary = {
  id: string;
  time: string;
  weather: Weather;
  title: string;
  base64Img: string;
  content: string;
};

type OrderOption = "date" | "recent";

type Weather = "sun" | "rain" | "snow" | "cloud";
