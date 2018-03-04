import React from 'react';
import { connect } from 'react-redux';

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    };

    if(this.props.notifications){
      return <div style={style}>{this.props.notifications}</div>;
    }
    return null
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;