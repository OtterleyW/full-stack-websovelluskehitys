import React from 'react';
import blogService from '../services/blogs';

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

  createBlog = () => {
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    };
    blogService.create(blog);
  };

  render() {
    return (
      <div>
        <h2>Add new blog</h2>
        <form onSubmit={this.createBlog}>
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>Save</button>
        </form>
      </div>
    );
  }
}

export default NewBlogForm;
