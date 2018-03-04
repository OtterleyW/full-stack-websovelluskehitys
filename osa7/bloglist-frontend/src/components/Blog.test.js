import React from 'react';
import { shallow } from 'enzyme';
import Blog from './Blog';

describe('<Blog />', () => {
  it('after clicking name the details are displayed', () => {
    const blog = {
      title: 'Testi',
      author: 'T. Estaaja',
      likes: 3,
      user: {
        username: 'T. Esti'
      }
    };

    const blogComponent = shallow(<Blog blog={blog} />);

    const informationSpan = blogComponent.find('.information');
    
    informationSpan.simulate('click');

    const likesDiv = blogComponent.find('.likes');
    const information = `${blog.title} (by ${blog.author})`;

    const likes = expect(informationSpan.text()).toContain(information);
    expect(likesDiv.getElement().props.style).toEqual({ display: '' });
  });
});
