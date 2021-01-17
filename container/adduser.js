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
  Image,
} from 'react-native';
import axios from 'axios';
import AudioRecord from 'react-native-audio-record';
import {Buffer} from 'buffer';
import RNFS from 'react-native-fs';
import Geolocation from 'react-native-geolocation-service';

export default class Home extends Component {
  state = {
    eid: null,
    // id: 'b32ce6ab77e14591aac2646405775cdf',
    recording: false,
    fileloc: '',
  };
  options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: 'regaud.wav', // default 'audio.wav'
  };
  count = 0;

  startreco = () => {
    console.log('start');
    AudioRecord.start();
    this.setState({
      recording: true,
    });
  };

  stopreco = async () => {
    // AudioRecord.stop();
    // this.renderSentence();

    if (this.state.recording) {
      this.count = this.count + 1;
      let audioFile = await AudioRecord.stop();
      console.log('stop', this.count, audioFile);
      this.setState({
        recording: false,
        fileloc: audioFile,
      });
      this.sendaudio();
    }
  };

  sendaudio = async () => {
    var form = new FormData();
    form.append('audio', {
      name: 'regaud.wav',
      type: 'audio/wav',
      uri: 'file://' + this.state.fileloc,
    });
    axios.post('http://192.168.29.124:2000/reg1Audio', form).then(res => {
      console.log(res.data);
      // this.setState({result: res.data.result});
    });
  };

  componentDidMount() {
    AudioRecord.init(this.options);
  }

  renderSample = num => {
    return (
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            color: 'beige',
            textAlign: 'center',
          }}>
          Sample {num} {'\n'}
        </Text>

        <View style={styles.recordview}>
          <View style={styles.startbtn}>
            <TouchableOpacity
              disabled={this.state.recording}
              onPress={this.startreco}
              style={styles.addbutton1}>
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/play-button.png')}
              />
            </TouchableOpacity>
          </View>

          {/* {this.state.recording ? (
            <View>
              <Image
                source={require('../assets/voice_loaderrr.gif')}
                style={{height: 300, width: 300}}
              />
            </View>
          ) : null} */}

          <View style={styles.stopbtn}>
            <TouchableOpacity
              disabled={!this.state.recording}
              onPress={this.stopreco(num)}
              style={styles.addbutton1}>
              <Image
                style={{width: 45, height: 45}}
                source={require('../assets/square.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  addUser = () => {
    // var formaudi = new FormData();
    console.log(this.state.eid);
    // formaudi.append('eid', this.state.eid);
    axios
      .post('http://192.168.29.124:2000/registerAudio', {eid: this.state.eid})
      .then(res => {
        console.log(res.data);
        // this.setState({result: res.data.result});
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Image style={styles.back} source={require('../assets/back.png')} />
          </TouchableOpacity>
          <View style={{marginLeft: 10, width: '50%'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: 'beige'}}>
              Add User
            </Text>
          </View>
        </View>
        <View style={styles.outer}>
          <TextInput
            style={styles.searchbox}
            placeholder="Enter uid"
            placeholderTextColor="#FF6347"
            onChangeText={text => this.setState({eid: text})}
            value={this.state.eid}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              color: 'beige',
              textAlign: 'center',
            }}>
            Record audio {'\n'}
          </Text>

          <View style={styles.recordview}>
            <View style={styles.startbtn}>
              <TouchableOpacity
                disabled={this.state.recording}
                onPress={this.startreco}
                style={styles.addbutton1}>
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../assets/play-button.png')}
                />
              </TouchableOpacity>
            </View>

            {this.state.recording ? (
              <View>
                <Image
                  source={require('../assets/voice_loaderrr.gif')}
                  style={{height: 300, width: 300}}
                />
              </View>
            ) : null}

            <View style={styles.stopbtn}>
              <TouchableOpacity
                disabled={!this.state.recording}
                onPress={this.stopreco}
                style={styles.addbutton1}>
                <Image
                  style={{width: 45, height: 45}}
                  source={require('../assets/square.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.outer}>
          <TouchableOpacity onPress={this.addUser} style={styles.proceed}>
            <Text style={{color: '#FF6347'}}>Proceed</Text>
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
    backgroundColor: 'black',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 60,
    // borderWidth:1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.9,
    elevation: 6,
    backgroundColor: '#383838',
    color: 'beige',
  },
  outer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    marginLeft: 5,
    height: 35,
    width: 35,
  },
  uid: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '5%',
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
  recordview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  addbutton1: {
    width: Dimensions.get('window').width * 0.2,
    height: 50,
    // backgroundColor:"#000",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    // shadowColor:'black',
    // shadowOffset: {width: 10, height: 10},
    // shadowOpacity: 1,
    // elevation: 5,
    // shadowRadius:6
  },
  proceed: {
    width: Dimensions.get('window').width * 0.4,
    height: 50,
    backgroundColor: '#383838',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 3,
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 6,

    // width: Dimensions.get('window').width * 0.65,
    // height: 60,
    // backgroundColor: '#383838',
    // fontFamily: 'Roboto',
    // fontWeight: 'bold',
    // borderRadius: 10,
    // color: '#FF6347',
    // textAlign: 'center',
  },

  startbtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopbtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};
