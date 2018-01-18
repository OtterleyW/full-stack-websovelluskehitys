import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.nimi}</h1>
const Sisalto = (props) => {
  return(
      props.osat.map(osa=> <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)
  )
}
const Yhteensa = (props) => {
  const tehtavat = props.osat.map(osa=>osa.tehtavia)
  const reducer = (acc, curr) => {
    return acc+curr
  }

let yhteensa = tehtavat.reduce(reducer,0)

  tehtavat.forEach((luku) => {
     yhteensa = yhteensa + luku 
  })

  return(
    <p>yhteensä {yhteensa} tehtävää</p>
  )
}

const Kurssi = (props) => {
  const rivit = () => props.kurssit.map(kurssi => 
    <div key ={kurssi.id}>
          <Otsikko nimi = {kurssi.nimi} />
          <Sisalto osat = {kurssi.osat} />
          <Yhteensa osat = {kurssi.osat} />
      </div>
    )
  
  return(
    <div>
  {rivit()}
  </div>
   )   
}

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Kurssi kurssit={kurssit} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)