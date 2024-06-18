
import { DateTime } from "luxon";

const getDateFrom = (strDate: string): DateTime => {
    return DateTime.fromJSDate(new Date(strDate)).toUTC().setZone("Asia/Manila")
};

const dateNow = () => {
    const luxonDateTime = DateTime.local().setZone("Asia/Manila"); // Create a Luxon DateTime object
    const jsDate = luxonDateTime.toJSDate();
    return jsDate;
};

const formatDate = (strDate: string): Date => {
    const singaporeDateTime = getDateFrom(strDate);
    const manilaDateTime = singaporeDateTime.setZone("Asia/Manila");
    const jsDate = manilaDateTime.toJSDate();
    return jsDate;
};

const formatDateTimeString = (strDate: string): string => {
    const dateNow = getDateFrom(strDate);
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

    return `${timeString} ${meridian}`;
};
//Date Formater
const formatDateString = (strDate: string): string => {
    const date = getDateFrom(strDate);
    const month = date.month;
    const day = date.day;
    const year = date.year;
    const dayNow = dateNow().getDate()
    const monthNow = dateNow().getMonth();
    const yearNow = dateNow().getFullYear();
    if (yearNow === year && monthNow + 1 === month && dayNow === day) return "Today"
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

export { getDateFrom, formatDateTimeString, formatDateString, dateNow, formatDate };
