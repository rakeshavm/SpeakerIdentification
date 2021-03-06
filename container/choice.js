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

export default class Choice extends Component {
  state = {
    // eid: null,
    // id: 'b32ce6ab77e14591aac2646405775cdf',
  };

  handleRoute = (val, dep) => {
    this.props.navigation.navigate(val, {val: false, dependent: dep/*,eid: this.state.eid*/});
  };

  render() {
    return (
      <View style={styles.body}>
        {/* <View>
          <Text style={styles.head}>Speaker Identification</Text>
        </View> */}
        {/* <View style={styles.line} /> */}
        {/* <View style={styles.uid}>
          <TextInput
            style={styles.searchbox}
            placeholder="Enter uid"
            placeholderTextColor="#ff6347"
            onChangeText={text => this.setState({eid: text})}
            // value={this.state.uid}
          />
        </View> */}
        <View style={styles.login}>
          <TouchableOpacity
            onPress={() => this.handleRoute('Home', 'True')}
            style={styles.addbutton1}>
            <Text
              style={{
                color: '#ff6347',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
              }}>
              Text dependent
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.login}>
          <TouchableOpacity
            onPress={() => this.handleRoute('Home', 'False')}
            style={styles.addbutton1}>
            <Text
              style={{
                color: '#ff6347',
                fontFamily: 'Roboto',
                fontWeight: 'bold',
              }}>
              Text independent
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
    color: '#ff6347',
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
    color: '#ff6347',
    textAlign: 'center',
  },
  addbutton1: {
    width: Dimensions.get('window').width * 0.6,
    height: 60,
    backgroundColor: '#383838',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff6347',
    marginLeft: 3,
  },
  line: {
    width: Dimensions.get('window').width * 0.6,
    height: 2,
    borderTopWidth: 1,
    borderColor: '#ff6347',
  },
};
