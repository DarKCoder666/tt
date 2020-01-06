import {
  WEEK_DATE,
  MONTH_DATE,
  QUARTER_DATE,
  YEAR_DATE,
  MAX_DATE
} from '../constants/dateConsts'

export const getDaysForConst = (time) => {
  switch(time) {
    case WEEK_DATE:
      return 7
    case MONTH_DATE:
      return 30
    case QUARTER_DATE:
      return 30 * 4
    case YEAR_DATE:
      return 365
    case MAX_DATE:
      return Infinity
    default:
      return 0
  }
}
