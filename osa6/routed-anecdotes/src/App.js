import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  Grid,
  Row,
  Col,
  Alert,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  PageHeader,
  Image,
  Well,
  Badge,
  Glyphicon,
  Panel,
  Jumbotron
} from 'react-bootstrap';

const Menu = () => {
  const menuStyle = {
    backgroundColor: 'pink',
    padding: 10,
    textAlign: 'center'
  };

  const activeLink = {
    fontWeight: 'bold',
    color: 'red'
  };

  return (
    <div style={menuStyle}>
      <NavLink activeStyle={activeLink} exact to="/">
        <Glyphicon glyph="list-alt" /> anecdotes
      </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
      <NavLink activeStyle={activeLink} exact to="/create">
        <Glyphicon glyph="pencil" /> create new
      </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
      <NavLink activeStyle={activeLink} exact to="/about">
        <Glyphicon glyph="info-sign" /> about
      </NavLink>&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => (
        <ListGroupItem key={anecdote.id}>
          <Glyphicon glyph="heart-empty" />{' '}
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
);

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>
        has <Badge>{anecdote.votes}</Badge> votes
      </div>
      <div>
        For more info see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  );
};

const About = () => (
  <Grid>
    <Row>
      <Col xs={12} md={8}>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h2">About anecdote app</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <p>According to Wikipedia:</p>

            <em>
              An anecdote is a brief, revealing account of an individual person
              or an incident. Occasionally humorous, anecdotes differ from jokes
              because their primary purpose is not simply to provoke laughter
              but to reveal a truth more general than the brief tale itself,
              such as to characterize a person by delineating a specific quirk
              or trait, to communicate an abstract idea about a person, place,
              or thing through the concrete details of a short narrative. An
              anecdote is "a story with a point."
            </em>

            <p>
              Software engineering is full of excellent anecdotes, at this app
              you can find the best and add more.
            </p>
          </Panel.Body>
        </Panel>
      </Col>
      <Col xs={6} md={4}>
        <div>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Grace_Hopper.jpg"
            alt="Grace Hopper"
            width="80%"
            thumbnail
          />
        </div>
      </Col>
    </Row>
  </Grid>
);

const Footer = () => (
  <Well bsSize="small">
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>. See{' '}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{' '}
    for the source code.
  </Well>
);

class CreateNew extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '',
      author: '',
      info: ''
    };
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const notification = this.state.content;
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    });
    this.props.setNotification(`a new anecdote ${notification} created`);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <ControlLabel>content</ControlLabel>
            <FormControl
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />

            <ControlLabel>author</ControlLabel>
            <FormControl
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />

            <ControlLabel>url for more info</ControlLabel>
            <FormControl
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
            <br />
            <Button bsStyle="success" type="submit">
              create
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info:
            'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    };
  }

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) });
  };

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id);

  setNotification = notification => {
    this.setState({
      notification
    });

    setTimeout(() => {
      this.setState({
        notification: ''
      });
    }, 10000);
  };

  vote = id => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a));

    this.setState({ anecdotes });
  };

  render() {
    const notification = (
      <Alert bsStyle="success">{this.state.notification}</Alert>
    );

    return (
      <div className="container">
        <Router>
          <div>
         

            <Jumbotron>
            <PageHeader>Software anecdotes</PageHeader>
  <p>
  Software engineering is full of excellent anecdotes, at this app you can find the best and add more.
  </p>

     <Menu />

</Jumbotron>

            

            {this.state.notification ? notification : null}
            <Route
              exact
              path="/"
              render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}
            />

            <Route
              exact
              path="/anecdotes/:id"
              render={({ match }) => (
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />
              )}
            />
            <Route
              path="/create"
              render={({ history }) => (
                <CreateNew
                  history={history}
                  addNew={this.addNew}
                  setNotification={this.setNotification}
                />
              )}
            />
            <Route path="/about" render={() => <About />} />
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
