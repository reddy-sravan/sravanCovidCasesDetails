import {XAxis, YAxis, Tooltip, Legend, BarChart, Bar} from 'recharts'

import './index.css'

const BarGraph = props => {
  const {data, Category} = props

  let confirmback
  switch (Category) {
    case 'confirmed':
      confirmback = '#9A0E31'
      break
    case 'active':
      confirmback = '#0A4FA0'
      break
    case 'recovered':
      confirmback = '#216837'
      break
    case 'deceased':
      confirmback = '#474C57'
      break
    default:
      return ''
  }

  return (
    <div className="bar">
      <BarChart width={600} height={450} data={data}>
        <XAxis dataKey="date" stroke={`${confirmback}`} />
        <YAxis dataKey="count" hide />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="count"
          fill={`${confirmback}`}
          className="bar"
          radius={[5, 5, 0, 0]}
          label={{
            position: 'top',
            fill: `${confirmback}`,
            fontSize: 10,
          }}
        />
      </BarChart>
    </div>
  )
}

export default BarGraph
