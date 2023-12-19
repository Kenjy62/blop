"use client";

// DayJS
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function useDateDiff(date) {
  const now = dayjs();
  const dateDiff = now.diff(date, "minute");

  return dateDiff;
}
