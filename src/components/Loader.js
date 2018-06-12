import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
} from 'react-native';

const Loader = ({ size }) => {
    return(
        <View>
            <ActivityIndicator size={size || "small"} color="#000" />
        </View>
    );
}
export default Loader;