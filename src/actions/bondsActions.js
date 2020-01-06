import API from '../API'
import { RECEIVED_BOND, RECEIVED_BOND_NAMES } from '../constants/actionConsts'
import { getBondFromStorage, addBondToStorage } from '../utils/localStorage'

export const receiveBondAction = ({isin, date}) => async dispatch => {
  const bondFromStorage = getBondFromStorage({isin, date})
  let result;
  
  if(bondFromStorage) {
    result = bondFromStorage
  } else {
    const response = await API.getBond({isin, date})
    result = response[0]
    addBondToStorage({obj: result, date})
  }

  dispatch({
    type: RECEIVED_BOND,
    payload: result
  })
}

export const receiveBondNamesAction = () => async dispatch => {
  const response = await API.getBondsName()

  dispatch({
    type: RECEIVED_BOND_NAMES,
    payload: response
  })
}
