import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
// アイコンたち↓
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import HouseIcon from '@mui/icons-material/House';
import LiquorIcon from '@mui/icons-material/Liquor';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SavingsIcon from '@mui/icons-material/Savings';
// アイコンたち↑
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Category } from "@mui/icons-material";
import { ExpenseCategory, IncomeCategory } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, transactionSchema } from "../validations/schema";
import { Transaction } from '../types'

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
  onSaveTransaction: ( transaction: Schema ) => Promise<void>;
  selectedTransaction: Transaction | null;
  onDeleteTransaction: (transactionId: string) => Promise<void>;
  setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>;
}
type IncomeExpense = "income" | "expense";

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element
}

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
  onSaveTransaction,
  selectedTransaction,
  setSelectedTransaction,
  onDeleteTransaction,
  onUpdateTransaction,
}:TransactionFormProps ) => {
  const formWidth = 320;

  const expenseCategories: CategoryItem[] = [
    {label: "食費", icon: <DinnerDiningIcon fontSize='small'/>},
    {label: "日用品", icon:<DryCleaningIcon fontSize='small'/>},
    {label: "居住費", icon: <HouseIcon fontSize='small'/>},
    {label: "交際費", icon: <LiquorIcon fontSize='small'/>},
    {label: "娯楽", icon: <SportsTennisIcon fontSize='small'/>},
    {label: "交通費", icon: <CommuteIcon fontSize='small'/>}
  ];

  const incomeCategories: CategoryItem[] = [
    {label: "給与", icon: <LocalAtmIcon fontSize='small'/>,},
    {label: "副収入", icon: <MonetizationOnIcon fontSize='small'/>},
    {label: "お小遣い", icon: <SavingsIcon fontSize='small'/>},
  ];

  const[categories, setCategories] = useState(expenseCategories);
  const {
    control,
    setValue,
    watch,
    formState:{errors},
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
    resolver: zodResolver(transactionSchema),
  });
  // console.log(errors);
//収支タイプを切り替える↓
  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
    setValue("category", "");
  };

  // 収支タイプを監視
  const currentType =  watch("type");
  // console.log(currentType);

  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);

  useEffect(() => {
    const newCategories = currentType === "expense" ? expenseCategories : incomeCategories;
    // console.log("これ", newCategories);
    setCategories(newCategories);
  }, [currentType]);

  // 送信処理
  const onSubmit: SubmitHandler<Schema> = (data) => {
    // console.log("ここです", data);
    if (selectedTransaction) {
      onUpdateTransaction(data, selectedTransaction.id)
      .then(() => {
        setSelectedTransaction(null);
        // console.log("更新しました");
      })
      .catch((error) => {
        console.error(error);
      })
    } else {
      onSaveTransaction(data)
      .then(() => {
        console.log("保存しました");
      })
      .catch((error) => {
        console.error(error);
      })

    }
    reset({
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    });
  };

  useEffect(() => {
    //選択肢が更新されたか確認
    // ↓このif文がtrueなら
    if (selectedTransaction) {
    // ↓これを返し、ここではカテゴリーの選択肢の中に選択された名前と一致する名前があるか調べてる。
      const categoryExists = categories.some(
        // 一致する名前があったら、選択肢が更新されたということ
        (category) => category.label === selectedTransaction.category
      );
      setValue("category", categoryExists ? selectedTransaction.category : "");
    }
  }, [selectedTransaction, categories]);

  // フォームの内容を更新
  useEffect(() => {
    if (selectedTransaction) {
      setValue("type", selectedTransaction.type);
      setValue("date", selectedTransaction.date);
      setValue("amount", selectedTransaction.amount);
      setValue("content", selectedTransaction.content);
    } else {
      reset({
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",})
    }
  }, [selectedTransaction]);

  const handleDelete = () => {
    if (selectedTransaction){
      onDeleteTransaction(selectedTransaction.id);
      setSelectedTransaction(null);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({field}) => {
              console.log(field);
              return (
                <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "expense" ? "contained" : "outlined"} color="error"
                  onClick={() => incomeExpenseToggle("expense")}
                >
                  支出
                </Button>
                <Button
                  onClick={() => incomeExpenseToggle("income")}
                  variant={field.value === "income" ? "contained" : "outlined"}
                  color={"primary"}
                >
                  収入
                </Button>
              </ButtonGroup>
              )
            }}
          />
          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({field}) => (
                <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          {/* カテゴリ */}
          <Controller
            name= "category"
            control={control}
            render={({field}) => (
              <TextField
                error={!!errors.category}
                helperText={errors.category?.message}
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
              >
                {categories.map((category, index) => (
                  <MenuItem value={category.label} key={index}>
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({field}) => (
              <TextField
              error={!!errors.amount}
              helperText={errors.amount?.message}
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
              />
            )}
          />
          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({field}) => (
              <TextField
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field}
                label="内容"
                type="text"
              />
            )}
          />
          {/* 保存ボタン */}
          <Button type="submit" variant="contained" color={currentType === "income" ? "primary" : "error"} fullWidth>
            {selectedTransaction ? "更新" : "保存"}
          </Button>
          {selectedTransaction && (
            <Button
              onClick={handleDelete}
              variant="outlined"
              color={"secondary"}
              fullWidth
            >
              削除
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;
