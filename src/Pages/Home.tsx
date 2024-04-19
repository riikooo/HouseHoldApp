import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionForm from '../components/TransactionForm'
import TransactionMenu from '../components/TransactionMenu'
import { Transaction } from '../types'

interface HomeProps {
  monthlyTransactions: Transaction[]
}

const Home = ({monthlyTransactions}: HomeProps) => {
  return (
    <Box  sx={{display: "flex"}}>
      {/* 左側 */}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}/>
        <Calender monthlyTransactions/>
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