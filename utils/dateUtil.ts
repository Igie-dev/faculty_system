import { DateTime } from "luxon";

const getDateFrom = (date:Date):Date => {
  return DateTime.fromJSDate(new Date(date)).toUTC().setZone("Asia/Manila");
};

const dateNow = () => {
  const luxonDateTime = DateTime.local().setZone("Asia/Manila"); // Create a Luxon DateTime object
  const jsDate = luxonDateTime.toJSDate();
  return jsDate;
};

const formatDate = (dateToFormat:DateTime):string => {
  const singaporeDateTime = getDateFrom(dateToFormat);
  const manilaDateTime = singaporeDateTime.setZone("Asia/Manila");
  const jsDate = manilaDateTime.toJSDate();
  return jsDate;
};

const handleFormatTime = (date:DateTime):string => {
  const dateNow = getDateFrom(date);
  const hours = dateNow.hour;
  const minutes = dateNow.minute;
  let timeString = "";
  let meridian = "";

  if (hours === 0) {
    timeString = "12";
    meridian = "AM";
  } else if (hours > 12) {
    timeString = (hours - 12).toString();
    meridian = "PM";
  } else if (hours === 12) {
    timeString = "12";
    meridian = "PM";
  } else {
    timeString = hours.toString();
    meridian = "AM";
  }

  timeString += ":" + (minutes < 10 ? "0" + minutes : minutes);
  return timeString + " " + meridian;
};
//Date Formater
const handleformatDate = (date:DateTime):string => {
  const dateNow = getDateFrom(date);
  const month = dateNow.month;
  const day = dateNow.day;
  const year = dateNow.year;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
};

export { getDateFrom, handleFormatTime, handleformatDate, dateNow, formatDate };
