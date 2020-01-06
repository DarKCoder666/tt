import { getDaysForConst } from './utils/dateUtils'
const bonds = []

const API = {
  getBondsName () {
    const result = bonds.map(el => el.isin)

    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(result)
      }, 300)
    })
  },

  getBond ({ isin, date }) {
    const numeberOfDays = getDaysForConst(date)
    let filterdBonds = bonds.filter(el => {
      if (isin === el.isin) {
        return true
      }
      return false
    })

    filterdBonds = filterdBonds.map(el => {
      let elClone = JSON.parse(JSON.stringify(el))

      elClone.data.dates.splice(numeberOfDays, elClone.data.dates.length)
      return elClone
    })

    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve(filterdBonds)
      }, 300)
    })
  }
}

function init () {
  const today = Date.now()
  const oneDayMS = 24 * 60 * 60 * 1000
  let startYield = Math.abs((Math.random() * 1000).toFixed(2))
  let startSpread = Math.abs((Math.random() * 1000).toFixed(2))
  let startPrice = Math.abs((Math.random() * 1000).toFixed(2))

  for (let i = 0; i < 100; i++) {
    const dates = []

    for (let j = 0; j < 365; j++) {
      let thisDate = new Date(today - oneDayMS * j)

      dates.push({
        name: `${thisDate.getDate()}/${thisDate.getMonth() + 1}`,
        yield: startYield += (Math.random() * 5).toFixed(2) * getRandomSign(),
        spread: startSpread += (Math.random() * 5).toFixed(2) * getRandomSign(),
        price: startPrice += (Math.random() * 5).toFixed(2) * getRandomSign()
      })
    }

    const bond = {
      isin: 'XS' + Math.floor(Math.random() * 10000000000),
      data: {
        dates
      }
    }

    bonds.push(bond)
  }

  function getRandomSign () {
    return Math.round(Math.random()) ? -1 : 1
  }
}

init()

export default API