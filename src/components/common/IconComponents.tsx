
import React from 'react'
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import HouseIcon from '@mui/icons-material/House';
import LiquorIcon from '@mui/icons-material/Liquor';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SavingsIcon from '@mui/icons-material/Savings';

import { ExpenseCategory, IncomeCategory } from '../../types';

const IconComponents:Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
    食費: <DinnerDiningIcon fontSize='small'/>,
    日用品: <DryCleaningIcon fontSize='small'/>,
    居住費: <HouseIcon fontSize='small'/>,
    交際費: <LiquorIcon fontSize='small'/>,
    娯楽: <SportsTennisIcon fontSize='small'/>,
    交通費: <CommuteIcon fontSize='small'/>,
    給与: <LocalAtmIcon fontSize='small'/>,
    副収入: <MonetizationOnIcon fontSize='small'/>,
    お小遣い: <SavingsIcon fontSize='small'/>,
}

export default IconComponents