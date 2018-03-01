import React from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlogForm from './components/NewBlogForm';
import Toggleable from './components/Toggleable';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      error: null,
      notification: null,
      username: '',
      password: '',
      user: null
    };
  }

  getBlogs = () => {
    console.log('Get blogs');
    const compareLikes = (a, b) => {
      console.log("A", a)
      console.log("B", b)
      return b.likes-a.likes;
    };

    blogService
      .getAll()
      .then(blogs => blogs.sort(compareLikes))
      .then(blogs => this.setState({ blogs }));
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
    this.setState({
      notification: text
    });
    setTimeout(() => {
      this.setState({ notification: null });
    }, 5000);
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
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
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

    window.localStorage.removeItem('loggedNoteappUser');
  };

  componentDidMount() {
    this.getBlogs();
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
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

    const notification = () => (
      <div className="notification">{this.state.notification}</div>
    );

    if (this.state.user === null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
          {this.state.error && error()}
          <form onSubmit={this.login}>
            <div>
              käyttäjätunnus
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <div>
              salasana
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleLoginFieldChange}
              />
            </div>
            <button>kirjaudu</button>
          </form>
        </div>
      );
    }

    return (
      <div>
        <p>
          {this.state.user.name} logged in{' '}
          <button onClick={this.logOut}>log out</button>
        </p>
        {this.state.notification && notification()}
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
        <h2>blogs</h2>
        {this.state.blogs.map(blog => (
          <Blog key={blog._id} blog={blog} giveLike={this.giveLike} />
        ))}
      </div>
    );
  }
}

export default App;
