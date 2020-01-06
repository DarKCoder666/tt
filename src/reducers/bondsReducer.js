import { RECEIVED_BOND, RECEIVED_BOND_NAMES } from '../constants/actionConsts'

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVED_BOND:
      return {
        ...state,
        currentBond: action.payload
      }
    case RECEIVED_BOND_NAMES:
      return {
        ...state,
        bondNames: action.payload
      }
    default:
      return state
  }
}