import React from 'react';
import { shallow } from 'enzyme';
import SimpleBlog from './SimpleBLog';

describe.only('<SimpleBlog />', () => {
  it('renders information', () => {
    const blog = {
      title: 'Testi',
      author: 'T. Estaaja',
      likes: 3
    };

    const blogComponent = shallow(<SimpleBlog blog={blog} />);
    const informationDiv = blogComponent.find('.information');

    const information = `${blog.title} ${blog.author}`;

    expect(informationDiv.text()).toContain(information);
  });

  it('renders likes', () => {
    const blog = {
      title: 'Testi',
      author: 'T. Estaaja',
      likes: 3
    };

    const blogComponent = shallow(<SimpleBlog blog={blog} />);
    const likesDiv = blogComponent.find('.likes');

    const likes = `blog has ${blog.likes} likes`;

    expect(likesDiv.text()).toContain(likes);
  });

  it('clicking the button two times calls eventhandler twice', () => {
    const blog = {
      title: 'Testi',
      author: 'T. Estaaja',
      likes: 3
    };

    const mockHandler = jest.fn();

    const blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    );

    const button = blogComponent.find('button');
    button.simulate('click');
    button.simulate('click');

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
