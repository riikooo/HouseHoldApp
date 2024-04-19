import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid"
import jaLocale from "@fullcalendar/core/locales/ja"
import "../calendar.css"
import { EventContentArg } from '@fullcalendar/core'
import { calculateDailyBalances } from '../utils/financeCalculations'

const Calender = (monthlyTransactions) => {

  const events = [
    { title: 'Meeting', start: "2024-04-10" },
    { title: 'Meeting', start: "2024-04-13", income: 300, expense: 200, balance:400 },
  ]

  const dailyBalances = calculateDailyBalances()

  // 日付ごとの収支を計算する関数
  const dailyBalances = {
    "2024-04-02" : {income: 700, expense: 200, balance: 500},
    "2024-04-05" : {income: 500, expense: 200, balance: 300},
  }

  // フルカレンダー用のイベントを生成する関数
  const calendarEvents =
  [
    {
      start: "2024-04-02",
      income: 700,
      expense: 200,
      balance:500
    },
    {
      start: "2024-04-05",
      income: 500,
      expense: 200,
      balance:300
    }
  ]


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

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={events}
      eventContent={renderEventContent}
    />
  )
}

export default Calender