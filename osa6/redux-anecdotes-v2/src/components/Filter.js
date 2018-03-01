import React from 'react'
import { filterData } from '../reducers/filterReducer'
import PropTypes from 'prop-types'

class Filter extends React.Component {
  handleChange = (event) => {
    this.context.store.dispatch(filterData(event.target.value))
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

Filter.contextTypes = {
  store: PropTypes.object
}

export default Filter