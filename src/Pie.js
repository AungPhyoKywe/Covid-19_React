import React from "react"
import {Pie} from 'react-chartjs-2';
class PieChart extends React.Component
{

    render()
    {
        return(

            <Pie
                width={600}
                height={400}
                data={{
                labels: ['ကူစက်ခံရသူ', 'ပြန်လဲသက်သာလာသူ', 'သေဆုံးသူ'],
                datasets: [
                  {
                
                    data: [this.props.total, this.props.recovered,this.props.deaths],
                    backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                    
                  },
                ],
                }}      
                />

        );
    }

}
export default PieChart;