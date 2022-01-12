import { log } from "./logger.js";
import { currentDate } from "./utils.js";
import { isFriday, isMonday, isWednesday } from "date-fns";

console.log(3 ?? 5);

log("my message");
currentDate();

console.log("is monday", isFriday(new Date()));
console.log("is monday", isMonday(new Date()));
console.log("is monday", isWednesday(new Date()));
