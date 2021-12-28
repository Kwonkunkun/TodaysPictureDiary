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
