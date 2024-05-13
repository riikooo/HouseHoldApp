export type TransactionType = "income" |  "expense";
export type IncomeCategory = "給与" | "副収入" | "お小遣い";
export type ExpenseCategory = "食費" | "日用品" | "居住費" | "交際費" | "娯楽" | "交通費";

export interface Transaction {
  id: string,
  date: string,
  amount: number,
  content: string,
  // タイプが２択以上の時、typeを上で変数にしてから書くと、複数選択肢に入れられる
  type: TransactionType,
  category:IncomeCategory | ExpenseCategory,
}

export interface Balance {
  income: number,
  expense: number,
  balance: number,
}

export interface CalendarContent {
  start: string,
  income: string,
  expense: string,
  balance: string,
}