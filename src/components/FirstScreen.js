import React from 'react';
import {StyleSheet,View,Image,KeyboardAvoidingView} from 'react-native';
import { Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import PhotoUpload from 'react-native-photo-upload';
import Loader from './Loader';
export default class FirstScreen extends React.Component {
    static navigationOptions = {
        title: 'Profile',
        headerLeft: null
    };
    state = {
        loading: false,
        fullName: ''
    };
    saveData = () => {
        this.setState({ loading: true });
        const fullName = this.state.fullName;
        return this.props.navigation.navigate('Second',{
                name:fullName,
                image:'image'
        });
    };
    renderLoader= () => {
        if (this.state.loading) {
            return (
                <Loader size="large" />
            );
        } else {
            return (
                <Icon
                    name="arrow-circle-right"
                    size={32}
                    style={styles.nextIcon}
                    onPress={this.saveData}
                />
            );
        }
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.wrapper}  behavior="padding" enabled>
                <PhotoUpload
                    onPhotoSelect={avatar => {
                        if (avatar) {
                            console.log('Image base64 string: ', avatar)
                        }
                    }}
                    style={{
                        padding: -100,
                        marginBottom: -100,
                    }}
                >
                    <Image
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 75,
                        }}
                        resizeMode='cover'
                        source={require('../assets/images/upload.png')}
                    />
                </PhotoUpload>
                <View style={styles.container}>
                    <View>
                        <Item style={styles.nameInput}>
                            <Input placeholder='Full Name'
                                placeholderTextColor={'#000'}
                                onChangeText={value => this.setState({ fullName : value })} 
                                inputType="text"
                                value={this.state.fullName} 
                            />
                            {this.renderLoader()}
                        </Item>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    userImage:{
        width: 180,
        height: 180,
        marginLeft: 20,
        marginRight: 20,
    },
    nameInput:{
        height:55,
        width:180
    },
    nestButtn:{
        position:'absolute',
        display: 'flex',
        width:70,
        
    }
});