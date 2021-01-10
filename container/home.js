import React, {Component} from 'react';
// import Geolocation from 'react-native-geolocation-service';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Axios from 'axios';

export default class Home extends Component {
  state = {
    // eid: null,
    // id: 'b32ce6ab77e14591aac2646405775cdf',
  };

  handleRoute = val => {
    this.props.navigation.navigate(val, {val: false /*,eid: this.state.eid*/});
  };

  render() {
    return (
      <View style={styles.body}>
        <View>
          <Text style={styles.head}>Speaker Verification</Text>
        </View>
        <View style={styles.line} />
        {/* <View style={styles.uid}>
          <TextInput
            style={styles.searchbox}
            placeholder="Enter uid"
            placeholderTextColor="#FF6347"
            onChangeText={text => this.setState({eid: text})}
            // value={this.state.uid}
          />
        </View> */}
        <View style={styles.login}>
          <TouchableOpacity
            onPress={() => this.handleRoute('Adduser')}
            style={styles.addbutton1}>
            <Text
              style={{
                color: '#FF6347',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
              }}>
              Add user
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.login}>
          <TouchableOpacity
            onPress={() => this.handleRoute('Attendance')}
            style={styles.addbutton1}>
            <Text
              style={{
                color: '#FF6347',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
              }}>
              Verify user
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  head: {
    color: '#FF6347',
    fontSize: 30,
    width: 200,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  uid: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '50%',
  },
  login: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '15%',
  },
  searchbox: {
    width: Dimensions.get('window').width * 0.65,
    height: 60,
    backgroundColor: '#383838',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    // borderRadius
    // borderWidth:1,
    // shadowColor:'#000',
    // shadowOffset: {width: 0, height: 3},
    // shadowOpacity: 0.3,
    // elevation: 1,
    borderRadius: 30,
    color: '#FF6347',
    textAlign: 'center',
  },
  addbutton1: {
    width: Dimensions.get('window').width * 0.3,
    height: 60,
    backgroundColor: '#383838',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6347',
    marginLeft: 3,
  },
  line: {
    width: Dimensions.get('window').width * 0.6,
    height: 2,
    borderTopWidth: 1,
    borderColor: '#FF6347',
  },
};
