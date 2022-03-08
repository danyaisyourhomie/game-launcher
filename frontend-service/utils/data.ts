export const renderDate = (date) => {
  const time = `${
    new Date(date).getHours() > 9
      ? new Date(date).getHours()
      : '0' + new Date(date).getHours()
  }:${
    new Date(date).getMinutes() > 9
      ? new Date(date).getMinutes()
      : '0' + new Date(date).getMinutes()
  }`;

  const month =
    new Date(date).getMonth() > 9
      ? new Date(date).getMonth() + 1
      : '0' + (new Date(date).getMonth() + 1);

  const day =
    new Date(date).getDate() > 9
      ? new Date(date).getDate()
      : '0' + new Date(date).getDate();

  const days = `${new Date(date).getFullYear()}/${month}/${day}`;
  return `${time} ${days}`;
};
