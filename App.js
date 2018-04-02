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


export default class App extends Component {

  state = ({
    product_honda: '',
    product_toyota: '',
    product_nissan: '',
    product_bmw: '',
    product_benz: ''
  });    

  getRemoteValues = () => {
    const keys = ['product_honda', 'product_toyota', 'product_nissan', 'product_bmw','product_benz'];
    const cacheExpiration = __DEV__ ? 0 : 0;  // 1 hour

    firebaseRemoteConfig.fetch(cacheExpiration)
      .then((res) => firebaseRemoteConfig.activateFetched())
      .then((activated) => {
        if (!activated) console.log('Fetched data not activated');
        return firebaseRemoteConfig.getValues(keys);
      })
      .then((datas) => {
        console.log('datas : ', datas)
        const product_honda = datas.product_honda.val();
        const product_toyota = datas.product_toyota.val();
        const product_nissan = datas.product_nissan.val();
        const product_bmw = datas.product_bmw.val();
        const product_benz = datas.product_benz.val();

        this.setState({
          product_honda,
          product_toyota,
          product_nissan,
          product_bmw,
          product_benz
        });
      })
      .catch((error) => console.log('err : ', error) )
  }

  componentDidMount() {
    if (__DEV__) {
      firebaseRemoteConfig.enableDeveloperMode();
    }

    // Set default values
    firebaseRemoteConfig.setDefaults({
      ...remoteConfigDefaults,
    });

    this.getRemoteValues();
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
