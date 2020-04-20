import React from "react";
import {Bar} from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.css';
class BarChart extends React.Component
{

    render()
    {
        return(
            <Bar
            width={600}
            height={400}
            data={{
            labels: ['ကူစက်ခံရသူ', 'ပြန်လဲသက်သာလာသူ', 'သေဆုံးသူ'],
            datasets: [
              {
                type: 'bar',
                label: 'ကူစက်ခံရသူ',
                
                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                data: [this.props.total, this.props.recovered,this.props.deaths],
              },
            ],
            }}
            options={{
            legend: { display: true },
            title: { display: true,text: `${this.props.count}${this.props.date.getDate()}.${this.props.date.getMonth()}.${this.props.date.getFullYear()}ရက်နေ့အထိCOVID-19ကူးစက်မှုအခြေအနေ`},
            }}
            />
        )
    }
}

export default BarChart;