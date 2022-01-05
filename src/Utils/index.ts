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
