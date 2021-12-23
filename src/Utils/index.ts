export const getAppDateStringFormatWith = (ISODateFormatString: string) => {
  const date = new Date(ISODateFormatString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};
