import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import "../calendar.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { CalendarContent, Transaction,Balance } from '../types'
import { formatCurrency } from '../utils/formatting'

interface CalendarPropos {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}
const Calender = ({monthlyTransactions, setCurrentMonth}: CalendarPropos) => {
  const events = [
    { title: 'Meeting', start: "2024-04-10" },
    { title: 'Meeting', start: "2024-04-13", income: 300, expense: 200, balance:400 },
  ]

  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  // console.log("日付ごとの収支",dailyBalances)

  // 日付ごとの収支を計算する関数
  // const dailyBalances = {
  //   "2024-04-02" : {income: 700, expense: 200, balance: 500},
  //   "2024-04-05" : {income: 500, expense: 200, balance: 300},
  // }

  // フルカレンダー用のイベントを生成する関数
  const createCalendarEvents = (dailyBalances: Record<string,Balance>):CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} = dailyBalances[date]
      return {
      start: date,
      income: formatCurrency(income),
      expense: formatCurrency(expense),
      balance:formatCurrency(balance),
      }
    })
  }

  const calendarEvents = createCalendarEvents(dailyBalances)
  console.log(calendarEvents);



  const renderEventContent = (eventInfo: EventContentArg) => {
    // console.log("イベント", eventInfo);
    return (
      <div>
        <div className='money' id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }

  const handleDateSet = (datesetInfo:DatesSetArg) => {
    // console.log("データセットインフォ",datesetInfo);
    setCurrentMonth(datesetInfo.view.currentStart)
  }

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
    />
  )
}

export default Calender