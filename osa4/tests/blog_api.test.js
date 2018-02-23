const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user')
const {
  initialBlogs,
  format,
  nonExistingId,
  blogsInDb,
  usersInDb
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
});

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

describe('Updating blog', async () => {
  let updateBlog;

  beforeAll(async () => {
    const newBlog = {
      title: 'Update this blog',
      author: 'Aku Ankka',
      url: 'http://www.jee.fi'
    };

    const newBlog2 = {
      title: 'Update this blog',
      author: 'Aku Ankka',
      url: 'http://www.jee.fi',
      likes: 3
    };

    const response = await api.post('/api/blogs').send(newBlog);
    updateBlog = response.body._id;

    const response2 = await api.post('/api/blogs').send(newBlog2);
    updateBlog2 = response2.body._id;
  });

  test('Update likes of the blog', async () => {
    const updatedBlog = {
      title: 'Update this blog',
      author: 'Aku Ankka',
      url: 'http://www.jee.fi',
      likes: '1'
    };
    await api
      .put(`/api/blogs/${updateBlog}`)
      .send(updatedBlog)
      .expect(200);

    const response = await api.get('/api/blogs');

    const blog = response.body.filter(blog => blog._id === updateBlog);

    expect(blog[0].likes).toEqual(1);
  });
});

describe.only('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'otter',
      name: 'Groovy Otter',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersBeforeOperation = await usersInDb()
  
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body).toEqual({ error: 'username must be unique'})
  
    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('POST /api/users fails with proper statuscode and message if password is too short', async () => {
    const usersBeforeOperation = await usersInDb()
  
    const newUser = {
      username: 'rootsie',
      name: 'Roo T',
      password: 'sa'
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body).toEqual({ error: 'password is too short'})
  
    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('New user is set to adult if the value is not given', async () => {
    const usersBeforeOperation = await usersInDb()
  
    const newUser = {
      username: 'adult',
      name: 'Adult',
      password: 'veryadult'
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body.adult).toEqual(true)
  
  })

  test('New user is not set to adult if the value is given', async () => {
    const usersBeforeOperation = await usersInDb()
  
    const newUser = {
      username: 'young',
      name: 'Not Adult',
      password: 'notadult',
      adult: false
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
  
    expect(result.body.adult).toEqual(false)
  
  })
})

afterAll(() => {
  server.close();
});
