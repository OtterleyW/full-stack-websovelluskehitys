import React from 'react';
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react';

class Toggleable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    console.log("Toggle visibility")
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    const toggleable = {margin: 20}
    return (
      <div style={toggleable}>
        <div style={hideWhenVisible}>
          <Button basic color='teal' onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <Button basic color='orange' onClick={this.toggleVisibility}>cancel</Button>
        </div>
      </div>
    )
  }
}

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable