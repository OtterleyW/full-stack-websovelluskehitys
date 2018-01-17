import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      voted: 0
    }
  }

  newAnecdote = () => {
    this.setState({
        selected: Math.floor(Math.random() * 6)
    })
  }

  vote = (props) => {
    this.setState({
    voted: anecdotes[this.state.selected].votes = anecdotes[this.state.selected].votes+1
    })
}

  render() {        
    let votes = this.props.anecdotes.map(anecdotes => anecdotes.votes)
    let mostVotes = votes.indexOf(Math.max(...votes))

    return ( 
      <div>
       <p> {this.props.anecdotes[this.state.selected].text}</p>
      
        <p>
            <Button handleClick={this.vote} text="Vote" anecdotes={anecdotes}/>
            <Button handleClick={this.newAnecdote} text="Next anecdote" />
        </p>

        <p> has {this.props.anecdotes[this.state.selected].votes} votes </p>
        <div>
            <h2>Anecdote with most votes:</h2>
            <p>{this.props.anecdotes[mostVotes].text}</p>
            <p>has {this.props.anecdotes[mostVotes].votes} votes</p>
        </div>
      </div>
    )
  }
}

const anecdotes = [
  {text: 'If it hurts, do it more often', votes: 0},
  {text: 'Adding manpower to a late software project makes it later!', votes: 0},
  {text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
  {text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
  {text: 'Premature optimization is the root of all evil.', votes: 0},
  {text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0}
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)