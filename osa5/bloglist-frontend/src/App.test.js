import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import Blog from './components/Blog';
jest.mock('./services/blogs');
import blogService from './services/blogs';

describe('<App />', () => {
  let app;

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />);
    });

    it('only login form is rendered', () => {
      app.update();
      const loginForm = app.find('.login-form');

      expect(loginForm.text()).toContain('Kirjaudu sovellukseen');
    });
  });

  describe('when user is logged', () => {
    beforeEach(() => {
      app = mount(<App />);

      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      };

      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
    });

    it('all notes are rendered', () => {
      app.update();
      const loggedUserJSON = localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.token = user.token;
      app.setState({ user });
    }

    const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(blogService.blogs.length)
    });
  });
});
