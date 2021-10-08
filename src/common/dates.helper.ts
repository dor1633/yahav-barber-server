export interface DateRange {
    fromDate: Date;
    toDate: Date;
}

export function convertDateAndTimeRangeToDatesObjects(date: string, timeRange: string): DateRange {
    const splittedTimeRange = timeRange.split("-")
    const formattedDate = `${date.substring(0, 2)}-${date.substring(2, 4)}-20${date.substring(4, 6)}`;
    return {
        fromDate: new Date(`${formattedDate} ${splittedTimeRange[0]}:00`),
        toDate: new Date(`${formattedDate} ${splittedTimeRange[1]}:00`)
    }
}