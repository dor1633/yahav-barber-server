export interface DateRange {
    fromDate: Date;
    toDate: Date;
}

export function convertDateAndTimeRangeToDatesObjects(date: string, timeRange: string): DateRange {
    const splittedDate = date.split("-");
    const splittedTimeRange = timeRange.split("-")
    const formattedDate = `${splittedDate[1]}-${splittedDate[0]}-20${splittedDate[2]}`;
    return {
        fromDate: new Date(`${formattedDate} ${splittedTimeRange[0]}:00`),
        toDate: new Date(`${formattedDate} ${splittedTimeRange[1]}:00`)
    }
}

export function getFormattedDate(date: Date) {
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + month + year % 100;
}