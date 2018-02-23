const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const {
  initialBlogs,
  format,
  nonExistingId,
  blogsInDb
} = require('./test_helper');

beforeAll(async () => {
  await Blog.remove({});
  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('Returning blogs', async () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const blogsAtBeginningOfOperation = await blogsInDb();
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(blogsAtBeginningOfOperation.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map(r => r.title);

    expect(titles).toContain('React patterns');
  });
});

describe('Adding blogs', async () => {
test('new blog can be added ', async () => {
  const blogsAtBeginningOfOperation = await blogsInDb();

  const newBlog = {
    title: 'Awesome blog is awesome',
    author: 'dog',
    url: 'http://www.blogi.fi'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const titles = response.body.map(r => r.title);
  const blogsAfterOperation = await blogsInDb();

  expect(blogsAfterOperation.length).toBe(
    blogsAtBeginningOfOperation.length + 1
  );
  expect(titles).toContain('Awesome blog is awesome');
});

test('if likes is not given likes is 0', async () => {
  const newBlog = {
    title: 'Not liked',
    author: 'dog',
    url: 'http://www.no.fi'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const blog = response.body.filter(r => r.title === 'Not liked');
  expect(blog[0].likes).toBe(0);
});

test('blog without title is not added ', async () => {
  const newBlog = {
    author: 'Aku Ankka',
    url: 'http://www.jee.fi'
  };

  const blogs = await api.get('/api/blogs');

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(blogs.body.length);
});

test('blog without url is not added ', async () => {
  const newBlog = {
    title: 'Urliton blogi',
    author: 'Aku Ankka'
  };

  const blogs = await api.get('/api/blogs');

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(blogs.body.length);
});
})

describe('Deleting blog', async () => {
  let deleteBlog;

  beforeAll(async () => {
    const newBlog = {
      title: 'Delete this blog',
      author: 'Aku Ankka',
      url: 'http://www.jee.fi'
    };

    const response = await api.post('/api/blogs').send(newBlog);
    deleteBlog = response.body._id;
  });

  test('delete added blog', async () => {
    const blogs = await api.get('/api/blogs');

    await api.delete(`/api/blogs/${deleteBlog}`).expect(200);

    const blogsAfterOperation = await api.get('/api/blogs');

    expect(blogsAfterOperation.body.length).toBe(blogs.body.length - 1);
  });
});

afterAll(() => {
  server.close();
});
