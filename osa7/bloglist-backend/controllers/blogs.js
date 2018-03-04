const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const body = request.body;

    if (body.title === undefined || body.url === undefined) {
      return response.status(400).json({ error: 'title or url is missing' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
      user: user._id
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.json(savedBlog);
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message });
    } else {
      console.log(exception);
      response.status(500).json({ error: 'something went wrong...' });
    }
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    let user = await User.findById(decodedToken.id);
    let blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      return response.status(200).end();
    } else {
      return response
        .status(401)
        .json({ error: "You can't delete blog you don't own" });
    }
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message });
    } else {
      console.log(exception);
      response.status(500).json({ error: 'something went wrong...' });
    }
  }
});

blogsRouter.put('/:id', async (request, response) => {
  try {
    const body = request.body;

    if (
      body === undefined ||
      body.title === undefined ||
      body.url === undefined
    ) {
      return response.status(400).json({ error: 'title or url is missing' });
    }

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });

    response.json(updatedBlog);
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error: 'something went wrong..' });
  }
});

module.exports = blogsRouter;
