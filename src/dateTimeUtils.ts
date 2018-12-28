/**
 * @module octobercodes/timeline
 */

export const DAY_IN_MILLISECONDS = 86400000;
export const CL_HOUR = 12;
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export class DateTimeUtils {
    public static now(): Date {
        return new Date();
    }
    public static stdTimezoneOffset(date: Date): number {
        const jan = new Date(date.getFullYear(), 0, 1);
        const jul = new Date(date.getFullYear(), 6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }
    public static dstHourAdjustment(date: Date): number {
        return (DateTimeUtils.stdTimezoneOffset(date) - date.getTimezoneOffset()) / 60;
    }
    public static stripTime(date: Date): Date {
        date.setHours(CL_HOUR + DateTimeUtils.dstHourAdjustment(date));
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    }
    public static formatDate(date: Date, formatString: string): string {
        let ret = formatString;
        if (formatString.indexOf('%d') != -1) {
            var dateNum = date.getDate().toString();
            if (dateNum.length < 2) {
                dateNum = `0${dateNum}`;
            }
            ret = ret.replace('%d', dateNum);
        }
        if (formatString.indexOf('%b') != -1) {
            var month = MONTH_NAMES[date.getMonth()].substring(0, 3);
            ret = ret.replace('%b', month);
        }
        if (formatString.indexOf('%Y') != -1) {
            ret = ret.replace('%Y', date.getFullYear().toString());
        }
        if (formatString.indexOf('%a') != -1) {
            var day = DAY_NAMES[date.getDay()].substring(0, 3);
            ret = ret.replace('%a', day);
        }
        return ret;
    }
    public static strftime(date: Date, formatString: string) {
        return DateTimeUtils.formatDate(date, formatString);
    }
    public static getEndDate(dateArray: Date[]): Date {
        return dateArray[dateArray.length - 1];
    }
    public static isFifthDay(date: Date) {
        const day = date.getDate();
        return (day == 1 || day % 5 === 0) && day != 30;
    }
    public static isHalfMonth(date: Date) {
        const day = date.getDate();
        return day == 1 || day == 15;
    }
    public static prevMonth(date: Date) {
        const newDate = new Date(date.getTime() - DAY_IN_MILLISECONDS);
        return new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    }
    public static nextMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
    public static prevQuarter(date: Date) {
        const newDate = new Date(date.getTime() - DAY_IN_MILLISECONDS);
        const month = newDate.getMonth();
        return new Date(newDate.getFullYear(), month - month % 3, 1);
    }
    public static nextQuarter(date: Date) {
        const month = date.getMonth();
        return new Date(date.getFullYear(), month - month % 3 + 3, 1);
    }
    public static backWeek(date: Date) {
        return new Date(date.getTime() - DAY_IN_MILLISECONDS * 7);
    }
    public static forwardWeek(date: Date) {
        return new Date(date.getTime() + DAY_IN_MILLISECONDS * 7);
    }
}
