import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from '@mui/material';
import { ExpenseCategory, IncomeCategory, Transaction, TransactionType } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}

const CategoryChart = ({ monthlyTransactions, isLoading }:CategoryChartProps ) => {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState<TransactionType>("expense");

  const handleChange = (
    e: SelectChangeEvent<TransactionType>
  ) => {
    setSelectedType(e.target.value as TransactionType)
  }

  const categorySums = monthlyTransactions.filter(
    (transaction) => transaction.type === selectedType
  ).reduce<Record<IncomeCategory | ExpenseCategory, number>>((acc, transaction) => {
    if(!acc[transaction.category]) {
      acc[transaction.category] = 0
    }
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {} as Record<IncomeCategory | ExpenseCategory, number>);

  // console.log("カテゴリーさむ", categorySums)
  const categoryLabels = Object.keys(categorySums) as (IncomeCategory | ExpenseCategory)[];
  const categoryValues = Object.values(categorySums);

  // const w = [...categoryLabels, ...categoryValues];
  // console.log("カテゴリーラベル！", categoryLabels)
  // console.log("カテゴリーばりゅー！", categoryValues)

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const incomeCategoryColor:Record<IncomeCategory, string> = {
    給与 : theme.palette.incomeCategoryColor.給与,
    副収入: theme.palette.incomeCategoryColor.副収入,
    お小遣い: theme.palette.incomeCategoryColor.お小遣い
  }

  const expenseCategoryColor:Record<ExpenseCategory, string> = {
    食費: theme.palette.expenseCategoryColor.食費,
    日用品: theme.palette.expenseCategoryColor.日用品,
    居住費: theme.palette.expenseCategoryColor.居住費,
    交際費: theme.palette.expenseCategoryColor.交際費,
    娯楽: theme.palette.expenseCategoryColor.娯楽,
    交通費: theme.palette.expenseCategoryColor.交通費
  };
  const getCategoryColor = (
    category: IncomeCategory | ExpenseCategory
  ):string => {
    if(selectedType === "income") {
      return incomeCategoryColor[category as IncomeCategory];
    } else {
      return expenseCategoryColor[category as ExpenseCategory];
    }
  }

  const data: ChartData<"pie"> = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        // ],
        backgroundColor: categoryLabels.map((category) =>
          getCategoryColor(category)
        ),
        borderColor: categoryLabels.map((category) =>
          getCategoryColor(category)
        ),
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="type-select-label">収支の種類</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          label="収支の種類"
          value={selectedType}
          onChange={handleChange}
        >
          <MenuItem value={"income"}>収入</MenuItem>
          <MenuItem value={"expense"}>支出</MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        {isLoading ? (
        <CircularProgress />
      ) : monthlyTransactions.length > 0 ? (
        <Pie data={data} options={options} />
      ) : (
        <Typography>この月はデータがないです</Typography>
      )}

      </Box>
    </>

  )
}

export default CategoryChart