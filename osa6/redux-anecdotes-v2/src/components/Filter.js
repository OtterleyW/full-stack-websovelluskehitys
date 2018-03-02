import React from 'react';
import { filterData } from '../reducers/filterReducer';
import { connect } from 'react-redux';

class Filter extends React.Component {
  handleChange = event => {
    this.props.filterData(event.target.value);
  };
  render() {
    const style = {
      marginBottom: 10
    };

    return (
      <div style={style}>
        filter <input onChange={this.handleChange} />
      </div>
    );
  }
}

const ConnectedFilter = connect(null, { filterData })(Filter);

export default ConnectedFilter;
