import React, { Component } from 'react'
import { LineChart, XAxis, Tooltip, CartesianGrid, Line } from 'recharts'

export default class Graph extends Component {
  render () {
    const data = this.props.bond.data.dates

    return (
      <div>
        <LineChart
          width={400}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="name" />

          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="spread" stroke="#ff7300" yAxisId={0} />
          <Line type="monotone" dataKey="price" stroke="#387908" yAxisId={1} />
          <Line type="monotone" dataKey="yield" stroke="#1134AA" yAxisId={2} />
        </LineChart>
      </div>
    )
  }
}
