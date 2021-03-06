import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import blogService from './services/blogs';
import userService from './services/users';
import loginService from './services/login';
import NewBlogForm from './components/NewBlogForm';
import Toggleable from './components/Toggleable';
import BlogList from './components/BlogList';
import Notification from './components/Notification';
import User from './components/User';
import Users from './components/Users';
import Blog from './components/Blog';
import { notify } from './reducers/notificationReducer';

import './App.css';
import { Container, Menu, Button, Header, Icon, Form } from 'semantic-ui-react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      users: [],
      error: null,
      username: '',
      password: '',
      user: null
    };
  }

  getBlogs = async () => {
    console.log('Get blogs');
    const compareLikes = (a, b) => {
      return b.likes - a.likes;
    };

    const blogs = await blogService.getAll();
    blogs.sort(compareLikes);
    this.setState({ blogs });
  };

  getUsers = () => {
    console.log('Get users');
    userService.getAll().then(users => this.setState({ users }));
  };

  giveLike = async blog => {
    const newLikes = blog.likes + 1;
    console.log(newLikes);

    const updateBlog = {
      _id: blog._id,
      user: blog.user._id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes
    };

    try {
      await blogService.update(updateBlog);

      const text = `Tykätty blogista ${blog.title}`;

      this.setNotification(text);
      this.getBlogs();
    } catch (error) {
      this.props.setNotification('Unable to save like the blog');
    }
  };

  setNotification = text => {
    console.log('Set notification', text);
    this.props.notify(text, 10);
  };

  setError = text => {
    console.log('Set error', text);
    this.setState({
      error: text
    });
    setTimeout(() => {
      this.setState({ error: null });
    }, 5000);
  };

  login = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      this.setState({ username: '', password: '', user });
    } catch (exception) {
      this.setError('Wrong username or password');
    }
  };

  logOut = () => {
    this.setState({
      user: null
    });

    window.localStorage.removeItem('loggedBlogAppUser');
  };

  componentDidMount() {
    this.getBlogs();
    this.getUsers();
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      this.setState({ user });
    }
  }

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const error = () => <div className="error">{this.state.error}</div>;

    const userById = id => {
      return this.state.users.find(user => user.id === id);
    };

    const blogById = id => {
      return this.state.blogs.find(blog => blog._id === id);
    };

    if (this.state.user === null) {
      return (
        <Container>
          <div className="login-form">
            <h2>Kirjaudu sovellukseen</h2>
            {this.state.error && error()}
            <Form onSubmit={this.login}>
              <div>
                <Form.Field>
                  <label>käyttäjätunnus</label>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleLoginFieldChange}
                  />
                </Form.Field>
              </div>
              <div>
                <Form.Field>
                  <label>salasana</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleLoginFieldChange}
                  />
                </Form.Field>
              </div>
              <br />
              <Button color="teal">kirjaudu</Button>
            </Form>
          </div>
        </Container>
      );
    }

    return (
      <Container>
        <Router>
          <div>
            <Header as="h2">
              <Icon name="book" />
              <Header.Content>Blog App</Header.Content>
            </Header>

            <Menu color="teal" inverted size="small">
              <Menu.Item link>
                <Link to="/">blogs</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link to="/users">users</Link>
              </Menu.Item>

              <Menu.Menu position="right">
                <Menu.Item header>{this.state.user.name} logged in</Menu.Item>

                <Menu.Item>
                  <Button color="blue" onClick={this.logOut}>
                    log out
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>

            <Notification />

            <Toggleable
              buttonLabel="new blog"
              ref={component => (this.newBlogForm = component)}
            >
              <NewBlogForm
                setNotification={this.setNotification}
                setError={this.setError}
                getBlogs={this.getBlogs}
                toggle={() => this.newBlogForm.toggleVisibility()}
              />
            </Toggleable>

            <Route
              exact
              path="/"
              render={() => <BlogList blogs={this.state.blogs} />}
            />

            <Route
              exact
              path="/blogs/:id"
              render={({ match }) => (
                <Blog
                  blog={blogById(match.params.id)}
                  giveLike={this.giveLike}
                />
              )}
            />

            <Route
              exact
              path="/users"
              render={() => <Users users={this.state.users} />}
            />

            <Route
              exact
              path="/users/:id"
              render={({ match }) => <User user={userById(match.params.id)} />}
            />
          </div>
        </Router>
      </Container>
    );
  }
}

export default connect(null, { notify })(App);
