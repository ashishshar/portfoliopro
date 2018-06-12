import React from 'react';
import {
    StyleSheet,
    ImageBackground,
    ScrollView,
    View,
    Image,
    KeyboardAvoidingView,
    Text
} from 'react-native';
export default class HeaderBar extends React.Component {
    render() {
        return (
            <Image
                source={require('../assets/images/logo.png')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}