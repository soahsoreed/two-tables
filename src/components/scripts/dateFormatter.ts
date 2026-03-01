import moment from "moment";

export function dateFormatter(date: string) { return moment(date).format("DD.MM.YYYY"); }
