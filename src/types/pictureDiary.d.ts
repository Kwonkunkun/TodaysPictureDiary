type PictureDiary = {
  id: string;
  time: string;
  weather: Weather;
  title: string;
  base64Img: string;
  content: string;
};

type Weather = "sun" | "rain" | "snow" | "cloud";
