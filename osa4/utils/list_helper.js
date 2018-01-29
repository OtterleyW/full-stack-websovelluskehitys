const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes);

  const reducer = (sum, item) => {
    return sum + item;
  };

  return likes.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  if(blogs.length === 0) {
    return "No blogs"
  }
  
  let mostLikes = blogs.map(blog => blog.likes);
  let result = mostLikes.indexOf(Math.max(...mostLikes));

  return {
    "title": blogs[result].title,
    "author": blogs[result].author,
    "likes": blogs[result].likes
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
