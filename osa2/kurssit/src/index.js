import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
  return(
      props.kurssi.osat.map(osa=> <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)
  )
}
const Yhteensa = (props) => {
  const tehtavat = props.kurssi.osat.map(osa=>osa.tehtavia)
  console.log(tehtavat)
let yhteensa = 0
  tehtavat.forEach((luku) => {
     yhteensa = yhteensa + luku 
  })

  return(
    <p>yhteensä {yhteensa} tehtävää</p>
  )
}

const Kurssi = (props) => {
    return (
    <div>
        <Otsikko kurssi = {props.kurssi} />
        <Sisalto kurssi = {props.kurssi} />
        <Yhteensa kurssi = {props.kurssi} />
    </div>
    )   
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 0
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 1
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 2
      },
      {
        nimi: 'Komponenttien tila 2',
        tehtavia: 20,
        id: 3
      }
    ]
  }
  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)