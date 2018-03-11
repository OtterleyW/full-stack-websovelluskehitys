import React from 'react';
import blogService from '../services/blogs';
import { notify } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

class NewBlogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      author: '',
      url: ''
    };
  }

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createBlog = async event => {
    event.preventDefault();

    this.props.toggle();

    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    };

    try {
      await blogService.create(blog);

      const text = `Lisätty ${this.state.title} kirjoittajalta ${
        this.state.author
      }`;

      this.props.notify(text, 5);
      this.props.getBlogs();

      this.setState({
        title: '',
        author: '',
        url: ''
      });
    } catch (error) {
      this.props.notify('Unable to save the blog', 5);
    }
  };

  render() {
    return (
      <div>
        <h2>Add new blog</h2>
        <Form onSubmit={this.createBlog}>
          <div>
            <Form.Field>
              <label>title</label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleLoginFieldChange}
              />
            </Form.Field>
          </div>
          <div>
            <Form.Field>
            <label>author</label>
              <input
                type="text"
                name="author"
                value={this.state.author}
                onChange={this.handleLoginFieldChange}
              />
            </Form.Field>
          </div>
          <div>
            <Form.Field>
            <label>url</label>
              <input
                type="text"
                name="url"
                value={this.state.url}
                onChange={this.handleLoginFieldChange}
              />
            </Form.Field>
          </div>
          <br />
          <Button basic color='green'>Save</Button>
          <br /><br />
        </Form>
      </div>
    );
  }
}

const ConnectedNewBlogForm = connect(null, {
  notify
})(NewBlogForm);

export default ConnectedNewBlogForm;
