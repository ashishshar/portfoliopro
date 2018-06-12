import React from 'react';
import { 
    StyleSheet, 
    ImageBackground, 
    ScrollView,
    View,
    Image,
    KeyboardAvoidingView, 
    Text, window
     } from 'react-native';
import { Item, Input, Button } from 'native-base';
import Loader from './Loader';
import firebase from 'firebase';

const apiUrl = "https://portfoliopro-68771.firebaseapp.com/"; 
export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
        header: null,
    };
    state = {
        userLogin:'',
        phoneNumber:'',
        verifycode:'',
        error:'',
        loading:false,
        otpSend:false
    };

    loginClick = () => {
        this.setState({ loading: true });
        const phoneNumber = this.state.phoneNumber;
        const logincheck = fetch( apiUrl +'signUpphone', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson) {
                this.setState({ 
                    loading: false ,
                    phoneNumber:phoneNumber,
                    otpSend:true
                });
            }
            else {
                this.setState({ loading: false });
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    verifyOtp = () => {
        this.setState({ loading: true });
        //this.props.navigation.navigate('First');
        const phoneNumber = this.state.phoneNumber;
        const verifycode = this.state.verifycode;
        console.log(this.state);
        const logincheck = fetch(apiUrl + 'login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    verifycode: verifycode
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                // If server response message same as Data Matched
                if (responseJson) {
                    const token = responseJson.customToken;
                    firebase.auth().signInWithCustomToken(token)
                    .then(() => {
                        this.setState({ userLogin : true });
                        this.props.navigation.navigate('First');
                        this.setState({ loading: false });
                    })
                    .catch(function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                    });
                }
                else {
                    this.setState({ loading: false });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderLoaderLogin = ()=> {
        if (this.state.loading){
            return(
                <Loader size="large"/>
            );
        }else{
            return(
                <Button block onPress={this.loginClick}>
                    <Text style={{color:'#fff'}}>Get Started</Text>
                </Button>
            );
        }
    }
    renderLoaderVerify = () => {
        if (this.state.loading) {
            return (
                <Loader size="large" />
            );
        } else {
            return (
                <Button block onPress={this.verifyOtp}>
                    <Text style={{ color: '#fff' }}>Verify</Text>
                </Button>
            );
        }
    }

    mainRender = () =>{
        if(this.state.otpSend){
            return( 
                <View style={styles.container}>
                    <View>
                        <Text style={styles.welcome}>
                            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.heading}>
                            PortfolioPro
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 20,color:'#000',marginBottom:20,alignSelf:'center', marginLeft: 10, marginRight: 10,}}>Please enter the OTP to Verify your account</Text>
                    </View>
                    <Item style={{borderColor:'#000', height:45, width:80, alignSelf:'center'}}>
                        <Input placeholder='000000'
                            placeholderTextColor={'#000'}
                            maxLength={6}
                            autoFocus={true}
                            onChangeText={value => this.setState({ verifycode : value })} 
                            inputType="number"
                            keyboardType="numeric" 
                            value={this.state.verifycode} 
                        />
                    </Item>
                    <Text style={styles.errorMessage}>
                        {this.state.error}
                    </Text>
                    <View style={styles.cardActionStyle}>
                        {this.renderLoaderVerify()}
                    </View>
                </View> 
            );
        }
        else{
            return(
                <View style={styles.container}>
                    <View>
                        <Text style={styles.welcome}>
                            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.heading}>
                            PortfolioPro
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.subHeading}>Welcome to portfoliopro</Text>
                    </View>
                    <Item regular style={{borderColor:'#000', height:45}}>
                        <Input placeholder='Phone Number'
                            placeholderTextColor={'#000'}
                            maxLength={10}
                            onChangeText={value => this.setState({ phoneNumber: value })}
                            inputType="number"
                            keyboardType="numeric"
                            value={this.state.phoneNumber}
                        />
                    </Item>
                    <View style={styles.cardActionStyle}>
                        {this.renderLoaderLogin()}
                    </View>
                </View> 
            );
        }
        
    }

    render() {
        const { container, form, fieldStyle, loginButtonArea, errorMessage, welcome, logo, cardstyl } = styles; 
        return (
            <ImageBackground source={require('../assets/images/background.jpg')} style={styles.backcontainer}>
                <KeyboardAvoidingView style={styles.wrapper}  behavior="padding" enabled>
                    {this.mainRender()}
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollview: {
        //paddingTop:230
    },
    welcome: {
        fontSize: 38,
        color:'#000',
        alignSelf:'center'
    },
    heading: {
        fontSize: 38,
        color:'#000',
        marginBottom:30,
        marginTop:-10,
        alignSelf:'center'
    },
    subHeading: {
        fontSize: 20,
        color:'#000',
        marginBottom:20,
        alignSelf:'center'
    },
    form: {
        paddingBottom: 15,
        //width: 250,
    },
    fieldStyle: {
        height: 40,
        color: '#FFF',
        //width: 250,
        marginTop: 10,
        fontSize: 18,
    },
    loginButtonArea: {
        marginTop: 10,
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        alignItems: 'center',
    },
    lineBrk: {
        fontSize: 5,
    },
    logo: {
        width: 80,
        height: 80,
    },
    cardstyl: {
        padding: 10,
    },
    cardActionStyle:{
        width:300,
        marginTop:20,
        marginBottom:50,
    }
});
