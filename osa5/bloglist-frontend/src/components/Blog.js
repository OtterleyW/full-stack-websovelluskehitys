import React from 'react';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' };
    const showWhenVisible = { display: this.state.visible ? '' : 'none' };

    const blog = this.props.blog;

    const blogStyle = {
      padding: 10,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }


    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          <span onClick={this.toggleVisibility}>{blog.title} (by {blog.author})</span><br />
        </div>
        <div style={showWhenVisible}>
          <span onClick={this.toggleVisibility}>{blog.title} (by {blog.author})</span><br />
          <a href={blog.url}>{blog.url}</a><br />
          {blog.likes} likes <button onClick={() => this.props.giveLike(blog)}>like</button><br />
          Added by {blog.user.username}
        </div>
      </div>
    );
  }
}

export default Blog;
