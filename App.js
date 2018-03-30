import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'react-native-firebase';

const firebaseRemoteConfig = firebase.config();
const remoteConfigDefaults = {
    product_honda: 'NSX',
    product_toyota: 'Supra',
    product_nissan: 'GTR',
    product_bmw: 'M6',
    product_benz: 'SLR'
};  
const keys = ['product_honda', 'product_toyota', 'product_nissan', 'product_bmw','product_benz'];

export default class App extends Component {

  state = ({
    product_honda: 'None',
    product_toyota: 'None',
    product_nissan: 'None',
    product_bmw: 'None',
    product_benz: 'None'
  });    

  componentDidMount() {
    // Set default values
    firebaseRemoteConfig.setDefaults({
      ...remoteConfigDefaults,
    });

    firebaseRemoteConfig.getValues(keys)
    .then((data) => {
      console.log(data);
      this.setState({
        product_honda: data.product_honda.val(),
        product_toyota: data.product_toyota.val(),
        product_nissan: data.product_nissan.val(),
        product_bmw: data.product_bmw.val(),
        product_benz: data.product_benz.val(),
      });
      console.log(this.state);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Honda : {this.state.product_honda}
        </Text>
        <Text style={styles.welcome}>
          Toyota : {this.state.product_toyota}
        </Text>
        <Text style={styles.welcome}>
          Nissan : {this.state.product_nissan}
        </Text>
        <Text style={styles.welcome}>
          BMW : {this.state.product_bmw}
        </Text>
        <Text style={styles.welcome}>
          BENZ : {this.state.product_benz}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
