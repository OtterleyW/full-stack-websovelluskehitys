import React from 'react'
import ReactDOM from 'react-dom'

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
        return (
          <div>
              <h1>Anna palautetta</h1>
            <div>
              <button onClick={this.annaHyva}>Hyvä</button>
              <button onClick={this.annaNeutraali}>Neutraali</button>
              <button onClick={this.annaHuono}>Huono</button>
            </div>
                <h2>Statistiikka</h2>
            <div>
                <p>Hyvä: {this.state.hyva}</p>
                <p>Neutraali: {this.state.neutraali}</p>
                <p>Huono: {this.state.huono}</p>
                <p>Äänien määrä: {this.state.aanienMaara}</p>
                <p>Keskiarvo: {this.state.keskiarvo}</p>
                <p>Positiivisia: {this.state.positiivisia}%</p>
            </div>
          </div>
        )
      }
    }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)