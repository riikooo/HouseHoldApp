import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Transaction } from '../types';
import { financeCalculations } from '../utils/financeCalculations';
import { formatCurrency } from '../utils/formatting';

interface MonthlySummaryProps {
  monthlyTransactions: Transaction[],
}
const MonthlySummary = ({monthlyTransactions}: MonthlySummaryProps) => {
  // console.log("サマリー",monthlyTransactions)
  const {income, expense, balance} = financeCalculations(monthlyTransactions);
  // console.log(monthlyTotals.balance, "を表示！")
  return (
<Grid container spacing={{xs: 1, sm: 2}} mb={2}>
    {/* 収入 */}
    <Grid  item xs={4} display={"frex"} flexDirection={"column"}>
      <Card
        sx={{
          bgcolor: (theme) => theme.palette.incomeColor.main,
          color: "white",
          borderRadius: "10px",
          flexGrow:1,
        }}
      >
        <CardContent sx={{padding: {xs:1, sm:2 }}}>
          <Stack direction={"row"}>
            <NorthIcon sx={{fontSize: "2rem"}}/>
            <Typography>収入</Typography>
          </Stack>
          <Typography
            textAlign={"right"}
            variant="h5"
            fontWeight={"fontWeightBold"}
            sx={{wordBreak: "break-word", fontSize: {xs: ".8rem", sm: "1rem", md: "1.2rem"},}}
          >
            ￥{formatCurrency(income)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    {/* 支出 */}
    <Grid  item xs={4} display={"frex"} flexDirection={"column"}>
      <Card
        sx={{
          bgcolor:  (theme) => theme.palette.expenseColor.main,
          color: "white",
          borderRadius: "10px",
          flexGrow:1,
        }}
      >
        <CardContent sx={{padding: {xs:1, sm:2 }}}>
          <Stack direction={"row"}>
            <SouthIcon sx={{fontSize: "2rem"}}/>
            <Typography>支出</Typography>
          </Stack>
          <Typography
            textAlign={"right"}
            variant="h5"
            fontWeight={"fontWeightBold"}
            sx={{wordBreak: "break-word", fontSize: {xs: ".8rem", sm: "1rem", md: "1.2rem"},}}
          >
            ￥{formatCurrency(expense)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    {/* 残高 */}
    <Grid  item xs={4} display={"frex"} flexDirection={"column"}>
      <Card
        sx={{
          bgcolor:  (theme) => theme.palette.balanceColor.main,
          color: "white",
          borderRadius: "10px",
          flexGrow:1,
        }}
      >
        <CardContent sx={{padding: {xs:1, sm:2 }}}>
          <Stack direction={"row"}>
            <AccountBalanceIcon sx={{fontSize: "2rem"}}/>
            <Typography>残高</Typography>
          </Stack>
          <Typography
            textAlign={"right"}
            variant="h5"
            fontWeight={"fontWeightBold"}
            sx={{wordBreak: "break-word", fontSize: {xs: ".8rem", sm: "1rem", md: "1.2rem"},}}
          >
            ￥{formatCurrency(balance)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
</Grid>
  )
}

export default MonthlySummary