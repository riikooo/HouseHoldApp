import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionForm from '../components/TransactionForm'
import TransactionMenu from '../components/TransactionMenu'
import { Transaction } from '../types'
import { useState } from 'react'
import { format } from 'date-fns'

interface HomeProps {
  monthlyTransactions: Transaction[]
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Home = ({monthlyTransactions, setCurrentMonth}: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  console.log("kokol", today)
  const[currentDay, setCurrentDay] = useState(today);

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });
  console.log("これ", dailyTransactions);
  return (
    <Box  sx={{display: "flex"}}>
      {/* 左側 */}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}/>
        <Calender
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
        />
      </Box>
      {/* 右側 */}
      <Box>
        <TransactionMenu />
        <TransactionForm />

      </Box>
    </Box>
  )
}

export default Home