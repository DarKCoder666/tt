import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'

import { receiveBondAction, receiveBondNamesAction } from './actions/bondsActions'
import { WEEK_DATE, MONTH_DATE, YEAR_DATE, QUARTER_DATE, MAX_DATE } from './constants/dateConsts'

import Graph from './components/Graph'

const mapStateToProps = state => ({
  bondNames: state.bondsReducer ? state.bondsReducer.bondNames : [],
  currentBond: state.bondsReducer ? state.bondsReducer.currentBond : null
})

const mapDispatchToProps = dispatch => ({
  receiveBondAction: (param) => dispatch(receiveBondAction(param)),
  receiveBondNamesAction: () => dispatch(receiveBondNamesAction())
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDate: WEEK_DATE,
      currentIsin: null
    }

    this.handleIsinChange = this.handleIsinChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.loadBond = this.loadBond.bind(this)
  }

  async componentDidMount () {
    await this.props.receiveBondNamesAction()
    this.loadBond()
  }

  loadBond() {
    if(!this.state.currentIsin) return

    this.props.receiveBondAction({
      isin: this.state.currentIsin,
      date: this.state.currentDate
    })
  }

  async handleIsinChange({value}) {
    await this.setState({
      ...this.state,
      currentIsin: value
    })

    this.loadBond()
  }

  async handleDateChange({value}) {
    await this.setState({
      ...this.state,
      currentDate: value
    })

    this.loadBond()
  }

  render () {
    const { bondNames } = this.props
    const isinOptions = bondNames ? bondNames.map(el => ({
      value: el,
      label: el
    })) : []
    const dateOptions = [
      {value: WEEK_DATE, label: "WEEK"},
      {value: MONTH_DATE, label: "MONTH"},
      {value: QUARTER_DATE, label: "QUARTER"},
      {value: YEAR_DATE, label: "YEAR"},
      {value: MAX_DATE, label: "MAX"},
    ]

    return (
      <div className="App">
        <Select options={isinOptions} onChange={this.handleIsinChange}/>
        <Select options={dateOptions} onChange={this.handleDateChange} defaultValue={dateOptions[0]}/>

        {this.props.currentBond && <Graph bond={this.props.currentBond} />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

