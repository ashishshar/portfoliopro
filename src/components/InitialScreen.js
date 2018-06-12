import React from 'react';
import { 
    StyleSheet, 
    ImageBackground,
    View,
    Image,
    ActivityIndicator,
    Text
} from 'react-native';

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

const InitialScreen = () => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.backcontainer}>
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
                <View style={styles.cardActionStyle}>
                    <ActivityIndicator color="#000" />
                </View>
            </View>
        </ImageBackground>
    );
}
export default InitialScreen;