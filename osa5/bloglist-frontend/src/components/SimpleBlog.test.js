import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBLog'

describe.only('<SimpleBlog />', () => {
  it('renders information', () => {
    const blog = {
      title: "Testi",
      author: "T. Estaaja",
      likes: 3
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const informationDiv = blogComponent.find('.information')

    const information = `${blog.title} ${blog.author}`

    expect(informationDiv.text()).toContain(information)
  })

  it('renders likes', () => {
    const blog = {
      title: "Testi",
      author: "T. Estaaja",
      likes: 3
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const likesDiv = blogComponent.find('.likes')

    const likes = `blog has ${blog.likes} likes`

    expect(likesDiv.text()).toContain(likes)
  })
})