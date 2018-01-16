import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistics = (props) => (
  <div>
    <Statistic text={props.stats[0].text} value={props.stats[0].value} />
    <Statistic text={props.stats[1].text} value={props.stats[1].value} />
    <Statistic text={props.stats[2].text} value={props.stats[2].value} />
    <Statistic text={props.stats[3].text} value={props.stats[3].value} />
    <Statistic text={props.stats[4].text} value={props.stats[4].value + '%'} />
  </div> 
)

const Statistic = (props) => (
  
  <p>{props.text} {props.value}</p>
)

class App extends React.Component {
    constructor() {
      super()
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0,
        aanienMaara: 0,
        keskiarvo: 0,
        positiivisia: 0 
      }
    }

  
    annaHyva = () => {
        this.setState({
          hyva: this.state.hyva + 1,
          aanienMaara: this.state.aanienMaara + 1,
          keskiarvo: ((this.state.hyva+1) + this.state.huono * -1) / (this.state.aanienMaara + 1),
          positiivisia: (this.state.hyva+1)/(this.state.aanienMaara+1)*100
      })
      }
    
      annaNeutraali = () => {
        this.setState({
          neutraali: this.state.neutraali + 1,
          aanienMaara: this.state.aanienMaara + 1,
          keskiarvo: (this.state.hyva + this.state.huono * -1) / (this.state.aanienMaara + 1),
          positiivisia: (this.state.hyva)/(this.state.aanienMaara+1)*100
        })
      }
      annaHuono = () => {
        this.setState({
          huono: this.state.huono + 1,
          aanienMaara: this.state.aanienMaara + 1,
          keskiarvo: (this.state.hyva * 1 + (this.state.huono+1) * -1) / (this.state.aanienMaara + 1),
          positiivisia: (this.state.hyva)/(this.state.aanienMaara+1)*100
        })
      }
    
      render() {

        const statistics = {stats:[
           {
             text: 'Hyvä:',
             value: this.state.hyva
           }, 
           {
            text: 'Neutraali:',
            value: this.state.neutraali
          },
          {
            text: 'Huono:',
            value: this.state.huono
          },
          {
            text: 'Keskiarvo:',
            value: this.state.keskiarvo
          },
          {
            text:'Positiivisia:',
            value: this.state.positiivisia
          }
        ]} 
        

        return (
          <div>
              <h1>Anna palautetta</h1>
            <div>
              <Button handleClick={this.annaHyva} text="Hyvä" />
              <Button handleClick={this.annaNeutraali} text="Neutraali" />
              <Button handleClick={this.annaHuono} text="Huono" />
            </div>
                <h2>Statistiikka</h2>
            <Statistics stats={statistics.stats} />
        
          </div>
        )
      }
    }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)