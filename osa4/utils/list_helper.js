const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)

  const reducer = (sum, item) => {
    return sum + item
  }

  return likes.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return 'No blogs'
  }

  let mostLikes = blogs.map(blog => blog.likes)
  let result = mostLikes.indexOf(Math.max(...mostLikes))

  return {
    title: blogs[result].title,
    author: blogs[result].author,
    likes: blogs[result].likes
  }
}

const mostBlogs = blogs => {
  if(blogs.length === 0){
    return undefined
  }
  const authors = blogs.map(blog => blog.author)

  let mostBlogs = []

  authors.forEach(author => {
    let findAuthor = mostBlogs.filter(blog => blog.author === author)
    if (findAuthor.length !== 0) {
      const i = mostBlogs.findIndex(obj => obj === findAuthor[0])
      mostBlogs[i].blogs = mostBlogs[i].blogs + 1
    } else {
      const obj = { author: author, blogs: 1 }
      mostBlogs.push(obj)
    }
  })

  const writer = mostBlogs.reduce(function(prev, current) {
    return prev.blogs > current.blogs ? prev : current
  })
  return writer
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
