const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body;

    const existingUser = await User.find({ username: body.username });
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' });
    }

    if (body.password.length < 3) {
      return response.status(400).json({ error: 'password is too short' })
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    let isAdult = true;

    if(body.adult === false){
      isAdult = body.adult
    }


    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      adult: isAdult
      
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    console.log(exception);
    response.status(500).json({ error: 'something went wrong...' });
  }
});

const formatUser = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs
  }
}

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(formatUser))
})

module.exports = usersRouter;
