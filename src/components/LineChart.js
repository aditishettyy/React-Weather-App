import React, {Component} from 'react'
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {	
    render() {
		const options = {
                animationEnabled: true,	
                
				title:{
                    text: "Weather Forecast for next 7 days",
                    fontColor: "white"
                },
                axisX : {
                    title: "Days",
                    titleFontColor: "white",
                    labelFontColor: "white",
                },
				axisY : {
					title: "Temperature",
                    includeZero: false,
                    titleFontColor: "white",
                    labelFontColor: "white",
				},
				toolTip: {
                    shared: false,
                    content: `  Day: {label} </br>
                                {currentLabel}: {y} </br> 
                                {otherLabel}: {otherTemp} </br> 
                                Condition: {text} </br>
                                `
                    
                },
                backgroundColor: "#282c34",
                legend: {
                    fontColor: "white"
                  },
				data: [{
					type: "spline",
					name: "Low Temperature",
                    showInLegend: true,
                    
					dataPoints: this.props.lowDataset
			},
				{
					type: "spline",
					name: "High Temperature",
					showInLegend: true,
					dataPoints: this.props.highDataset
				}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
  }

  export default LineChart;