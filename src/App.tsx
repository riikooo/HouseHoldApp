import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Report from './Pages/Report';
import NoMatch from './Pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';

function App() {

  // ↓Firestoreエラーかどうかを判断するところ
  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    // ↓ここでエラーオブジェクトに合致する条件式を書いてる
    return typeof err === "object" && err !==null && "code" in err
  }

  const[transactions, setTransactions] = useState<Transaction[]>([]);
  // ここはDate()ってことで日付の情報を入れてる。TSがDATE型だと推論してくれてるから、
  // <Date>って感じで型を指定してあげなくてもいい↓
  const[currentMonth, setCurrentMonth] = useState(new Date());

  // ↓ここで日付を「2024-04」のフォーマットに変換（そういうnpmのツール）
  const P = format(currentMonth, "yyyy-MM");
  // console.log("これ",P);

  useEffect(() => {
    const fecheTransacutions = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        // console.log(querySnapshot);
        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // cons[ole.log(doc.id, " => ", doc.data());
          return {
              ...doc.data(),
              id: doc.id,
          } as Transaction
          // ↑定義した型をここでasしてあげることで、「IDしかないよ」っていうエラーが消える（カタアサーション？って言うらしい）
        });
        // console.log (transactionsData, "ここ");
        setTransactions(transactionsData)
      }catch(err) {
        if(isFireStoreError(err)) {
          // ↓エラーが文字列で返ってきてるからJSON形式に戻して見てみたやつ
          // console.error(JSON.stringify(err, null, 2));
          console.error("firebaseのエラーは :",err)
          // console.error("firebaseのエラーメッセージは：",err.message)
          // console.error("firebaseのエラーコードは：",err.code)
        } else {
          console.error("一般的なエラーは :",err)
        }
      }
    }
    fecheTransacutions();
  }, [])
// currentMonthに今日の日付が入ってる。
// startsWithで、currentMonthと同じ日付のデータだけを抽出するようにしている。
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth))
  })

  //取引を保存する処理
  const handleSaveTransaction = async(transaction: Schema) => {
    console.log("uketoreta?", transaction);
    try {
      //firestoreにデータを保存
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction
      } as Transaction;

      setTransactions((prevTransaction) => [
        ...prevTransaction,
        newTransaction,
      ]);

    } catch(err) {
      if(isFireStoreError(err)) {
        // ↓エラーが文字列で返ってきてるからJSON形式に戻して見てみたやつ
        // console.error(JSON.stringify(err, null, 2));
        console.error("firebaseのエラーは :",err);
        // console.error("firebaseのエラーメッセージは：",err.message)
        // console.error("firebaseのエラーコードは：",err.code)
      } else {
        console.error("一般的なエラーは :",err);
      }
    }
  };

  //削除の処理
  const handleDeleteTransaction = async(transactionId: string) => {
    try {
      //firebaseのデータ削除
      await deleteDoc(doc(db, "Transactions", transactionId));
      const filterdTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
      // console.log(filterdTransactions)
      setTransactions(filterdTransactions);
    } catch (err) {
      if(isFireStoreError(err)) {
        // ↓エラーが文字列で返ってきてるからJSON形式に戻して見てみたやつ
        // console.error(JSON.stringify(err, null, 2));
        console.error("firebaseのエラーは :",err)
        // console.error("firebaseのエラーメッセージは：",err.message)
        // console.error("firebaseのエラーコードは：",err.code)
      } else {
        console.error("一般的なエラーは :",err)
      }
    }
  }
// 更新の処理
  const handleUpdateTransaction = async(
    transaction: Schema,
    transactionId: string
  ) => {
    try {
      // firestore更新処理
      // ↓ ここでfirestoreから更新対象のドキュメントを参照してる
      // (更新対象を取得してる)
      const docRef = doc(db, "Transactions", transactionId);
      // Set the "capital" field of the city 'DC'
      // ↓ ここで実際に更新
      await updateDoc(docRef, transaction);
      // フロント更新
      const updateTransactions = transactions.map((t) =>
        t.id === transactionId ? {...t, ...transaction} : t
      ) as Transaction[];
      //↑これを書くと、「setTransactions(updateTransactions)」で型を合わせろって言われるやつを解消できる
      console.log("更新してね〜〜",updateTransactions);
      setTransactions(updateTransactions);
    } catch (err) {
      if(isFireStoreError(err)) {
        // ↓エラーが文字列で返ってきてるからJSON形式に戻して見てみたやつ
        // console.error(JSON.stringify(err, null, 2));
        console.error("firebaseのエラーは :",err)
        // console.error("firebaseのエラーメッセージは：",err.message)
        // console.error("firebaseのエラーコードは：",err.code)
      } else {
        console.error("一般的なエラーは :",err)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {/* ↓リセットCSSみたいなやつ */}
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={
              <Home
                monthlyTransactions={monthlyTransactions}
                setCurrentMonth={setCurrentMonth}
                onSaveTransaction={handleSaveTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                onUpdateTransaction={handleUpdateTransaction}
                />}/>
            <Route
              path='/report'
              element={
                <Report
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                />
              }
            />
            <Route path='*' element={<NoMatch />}/>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
