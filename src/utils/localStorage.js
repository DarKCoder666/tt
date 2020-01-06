import {
  WEEK_DATE,
  MONTH_DATE,
  QUARTER_DATE,
  YEAR_DATE,
  MAX_DATE
} from '../constants/dateConsts'

let storage;

export const getBondFromStorage = ({isin, date}) => {
  const bond = storage[date][isin]
  return bond ? bond : false
}

export const addBondToStorage = ({obj, date}) => {
  storage[date][obj.isin] = obj
  localStorage.setItem('bonds', JSON.stringify(storage))
}

function init() {
  const localBonds = localStorage.getItem('bonds')
  storage = localBonds ? JSON.parse(localBonds) : {
    [WEEK_DATE]: {},
    [MONTH_DATE]: {},
    [QUARTER_DATE]: {},
    [YEAR_DATE]: {},
    [MAX_DATE]: {}
  }
}

init()