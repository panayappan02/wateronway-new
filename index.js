import React from 'react';
import {AppRegistry, View, StyleSheet, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values';
import {store} from './redux/store';
import {Provider} from 'react-redux';

class Index extends React.Component {
  render() {
    return (
      <View style={styles.main}>
        <Provider store={store}>
          <App key="App" />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

AppRegistry.registerComponent(appName, () => Index);
