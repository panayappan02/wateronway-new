import React, {Component} from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';

class Loading extends Component {
  render() {
    if (this.props.loading) {
      return (
        <View style={styles.container}>
          <Spinner
            isVisible={true}
            size={this.props.size || 22}
            type={this.props.type || 'Circle'}
            color={this.props.color || '#fff'}
          />
        </View>
      );
    }
    return <>{this.props.children}</>;
  }
}

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
};

export default Loading;
