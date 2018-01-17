import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

const Statistics = (props) => {
  if(props.stats[0].value === 0 && props.stats[1].value === 0 && props.stats[2].value === 0){
    return (
      <div>Yhtään palautetta ei ole annettu!</div>
    )
  }
  return(
  <table>
    <tbody>
      <Statistic text={props.stats[0].text} value={props.stats[0].value} />
      <Statistic text={props.stats[1].text} value={props.stats[1].value} />
      <Statistic text={props.stats[2].text} value={props.stats[2].value} />
      <Statistic text={props.stats[3].text} value={props.stats[3].value} />
      <Statistic text={props.stats[4].text} value={props.stats[4].value + '%'} />
    </tbody>
  </table> 
  )
}

const Statistic = (props) => (
<tr><td>{props.text}</td><td>{props.value}</td></tr>
)

class App extends React.Component {
    constructor() {
      super()
      this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0
      }
    }

  
    annaHyva = () => {
        this.setState({
          hyva: this.state.hyva + 1
      })
      }
    
      annaNeutraali = () => {
        this.setState({
          neutraali: this.state.neutraali + 1,
      })
      }
      annaHuono = () => {
        this.setState({
          huono: this.state.huono + 1,
           })
      }
    
      render() {

        const aanienMaara = this.state.hyva + this.state.huono + this.state.neutraali
        const keskiarvo = (this.state.hyva + this.state.huono * -1) / aanienMaara
        const positiivisia = (this.state.hyva / aanienMaara)*100

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
            value: keskiarvo
          },
          {
            text:'Positiivisia:',
            value: positiivisia
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