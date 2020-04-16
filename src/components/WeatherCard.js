import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeatherCard.css'
import data from './data/weatherData.json'
import Button from 'react-bootstrap/Button'
import LineChart from './LineChart'
import DetailCard from './DetailCard'

class WeatherCard extends Component {

    state = {
        cityData: [],
        weatherForecast: [],
        cityCurrentCondition: [],
        moreDetails: [],
        showDetails: false,
        dataset1: [],
        dataset2: []
    }

    generateChartData() {
        let highTemp = []
        let lowTemp = []
        if (this.state.weatherForecast[0]) {
            for (let i = 0; i < 7; i++) {
                let highCur = {
                    y: parseInt(this.state.weatherForecast[i].high),
                    otherTemp: parseInt(this.state.weatherForecast[i].low),
                    label: this.state.weatherForecast[i].day,
                    text: this.state.weatherForecast[i].text,
                    currentLabel: "High",
                    otherLabel: "low"
                }
                let lowCur = {
                    y: parseInt(this.state.weatherForecast[i].low),
                    otherTemp: parseInt(this.state.weatherForecast[i].high),
                    label: this.state.weatherForecast[i].day,
                    text: this.state.weatherForecast[i].text,
                    currentLabel: "Low",
                    otherLabel: "high"
                }
                highTemp.push(highCur)
                lowTemp.push(lowCur)
            }
        }

        this.setState({
            dataset1: highTemp,
            dataset2: lowTemp
        })
    }

    componentDidMount() {
        this.setState({
            cityData: data.query.results.channel.location,
            cityCurrentCondition: data.query.results.channel.item.condition,
            weatherForecast: data.query.results.channel.item.forecast,
            astronomyDetails: data.query.results.channel.astronomy,
            moreDetails: data.query.results.channel
        }, () => this.generateChartData())
    }

    toggleDetails() {
        if (this.state.showDetails) {
            this.setState({
                showDetails: false
            })
        }
        else {
            this.setState({
                showDetails: true
            })
        }
    }

    render() {
        return (
            <div className='row main' >
                <div className='col-md-11 mainCard' >
                    <div className='row'>
                        <div className='col-md-4 weatherImage'></div>
                        <div className='col-md-8 weatherContent'>
                            <div className='row'>

                                <DetailCard
                                    label='City:'
                                    value={this.state.cityData.city}
                                    width='6' >
                                </DetailCard>

                                <DetailCard
                                    label='Country:'
                                    value={this.state.cityData.country}
                                    width='6' >
                                </DetailCard>

                                <DetailCard
                                    label='Condition:'
                                    value={this.state.cityCurrentCondition.text}
                                    width='6' >
                                </DetailCard>

                                <DetailCard
                                    label='Temperature:'
                                    value={this.state.cityCurrentCondition.temp}
                                    width='6' >
                                </DetailCard>

                                <DetailCard
                                    label='High:'
                                    value={this.state.weatherForecast[0] ? this.state.weatherForecast[0].high : null}
                                    width='6' >
                                </DetailCard>

                                <DetailCard
                                    label='Low:'
                                    value={this.state.weatherForecast[0] ? this.state.weatherForecast[0].low : null}
                                    width='6' >
                                </DetailCard>
                            </div>

                            <div className='row rowChart'>
                                <div className='col-md-12'>
                                    <LineChart
                                        highDataset={this.state.dataset1}
                                        lowDataset={this.state.dataset2}>
                                    </LineChart>
                                </div>
                            </div>

                            <div className='row'>
                                <Button className='btn' variant='link' onClick={this.toggleDetails.bind(this)}> {this.state.showDetails ? "-" : "+"} Details</Button>
                                <div className='col-md-12' style={{ display: this.state.showDetails ? 'block' : 'none' }}>
                                    <div className='row'>

                                        <DetailCard
                                            label='Wind Speed:'
                                            value={this.state.moreDetails.wind ? this.state.moreDetails.wind.speed : null}
                                            width='4' >
                                        </DetailCard>

                                        <DetailCard
                                            label='Humidity:'
                                            value={this.state.moreDetails.atmosphere ? this.state.moreDetails.atmosphere.humidity : null}
                                            width='4' >
                                        </DetailCard>

                                        <DetailCard
                                            label='Pressure:'
                                            value={this.state.moreDetails.atmosphere ? this.state.moreDetails.atmosphere.pressure : null}
                                            width='4' >
                                        </DetailCard>

                                        <DetailCard
                                            label='Sunrise Time:'
                                            value={this.state.astronomyDetails ? this.state.astronomyDetails.sunrise : null}
                                            width='4' >
                                        </DetailCard>

                                        <DetailCard
                                            label='Sunset Time:'
                                            value={this.state.astronomyDetails ? this.state.astronomyDetails.sunset : null}
                                            width='4' >
                                        </DetailCard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherCard;
