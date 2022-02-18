import {LineChart, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'
import './index.css'

const LineCharts = props => {
  const {data, background, color} = props

  return (
    <li className={`${background} width`}>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        <XAxis dataKey="date" style={{color: 'green'}} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke={`${color}`} />
      </LineChart>
    </li>
  )
}

export default LineCharts
