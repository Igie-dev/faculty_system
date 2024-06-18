import React, { useEffect, useState } from 'react'
import {
  formatDateTimeString,
  formatDateString,
} from "@/utils/dateUtil";

export default function useFormatDateStr(strDate: string) {
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  useEffect(() => {
    if (!timeStr) {
      setTimeStr(formatDateTimeString(strDate))
    }
    if (!dateStr) {
      setDateStr(formatDateString(strDate))
    }
  }, [strDate, timeStr, dateStr])

  return { dateStr, timeStr }
}
