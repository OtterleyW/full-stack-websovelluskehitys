import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

class Notification extends React.Component {
  render() {
    if (this.props.notifications) {
      return <Message success>{this.props.notifications}</Message>;
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
