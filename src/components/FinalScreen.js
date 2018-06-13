import React from 'react';
import { 
    StyleSheet, 
    ImageBackground, 
    ScrollView,
    View,
    Image,
    KeyboardAvoidingView, 
    Text } from 'react-native';
import {Item, Input, Button} from 'native-base';
import { Card, CardItem, Icon, H3 } from 'native-base';
import Loader from './Loader';
const apiUrl = "https://portfoliopro-68771.firebaseapp.com/"; 
export default class FinalScreen extends React.Component {
    static navigationOptions = {
        title: 'Social'
    };
    state = {
        loading: false,
        name: '',
        image: '',
        about: '',
        work: '',
        email:'',
        facebook:'',
        instagram:'',
        linkedin:''
    };
    componentWillMount() {
        const name = this.props.navigation.state.params.name;
        const image = this.props.navigation.state.params.image;
        const about = this.props.navigation.state.params.about;
        const work = this.props.navigation.state.params.work;
        this.setState({
            name: name,
            image: image,
            about: about,
            work: work
        });

    };

    renderLoader = () => {
        if (this.state.loading) {
            return (
                <Loader size="large" />
            );
        } else {
            return (
                <Button block onPress={this.saveDadta}>
                    <Text style={styles.fieldStyle}>Finish</Text>
                </Button>
            );
        }
    }

    saveDadta = () =>{
        this.setState({ loading: true });
        const phoneNumber = '8218706886';
        const name = this.state.name;
        const image = this.state.image;
        const about = this.state.about;
        const work = this.state.about;
        const facebooklink = this.state.facebook;
        const insta = this.state.instagram; 
        const linkedin = this.state.linkedin;
        const email = this.state.email;
        //console.log(this.state);
        fetch(apiUrl + 'saveData', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                name: name,
                image: image,
                about: about,
                work: work,
                email: email,
                facebooklink: facebooklink,
                insta: insta,
                linkedin: linkedin
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if (responseJson) {
                return this.props.navigation.navigate('Home');
            }
            else {
                this.setState({ loading: false });
            }
        })
        .catch((error) => {
             console.error(error);  
        });
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollData}>
                        <Card style={styles.textareaStyle}>
                            <CardItem header bordered dark>
                                <H3 style={{color:'blue'}}> Connect to</H3>
                            </CardItem>
                            <CardItem bordered dark>
                                <Item regular>
                                    <Icon active name='mail' />
                                    <Input 
                                        placeholder='Email Id'
                                        placeholderTextColor={'#000'}
                                        onChangeText={value => this.setState({ email: value })}
                                        inputType="text"
                                        value={this.state.email} 
                                    />
                                </Item>
                            </CardItem>
                            <CardItem bordered dark>
                                <Item regular>
                                    <Icon active name='logo-facebook' />
                                    <Input 
                                        placeholder='Facebook Profile'
                                        placeholderTextColor={'#000'}
                                        onChangeText={value => this.setState({ facebook: value })}
                                        inputType="text"
                                        value={this.state.facebook} 
                                    />
                                </Item>
                            </CardItem>
                            <CardItem bordered dark>
                                <Item regular>
                                    <Icon active name='logo-instagram' />
                                    <Input 
                                        placeholder='Instagram Profile' 
                                        placeholderTextColor={'#000'}
                                        onChangeText={value => this.setState({ instagram: value })}
                                        inputType="text"
                                        value={this.state.instagram}
                                    />
                                </Item>
                            </CardItem>
                            <CardItem bordered dark>
                                <Item regular>
                                    <Icon active name='logo-linkedin' />
                                    <Input 
                                        placeholder='Linkedin Profile' 
                                        placeholderTextColor={'#000'}
                                        onChangeText={value => this.setState({ linkedin: value })}
                                        inputType="text"
                                        value={this.state.linkedin}
                                    />
                                </Item>
                            </CardItem>
                        </Card>
                        <View>
                            <View style={styles.cardActionStyle}> 
                                {this.renderLoader()}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        //paddingTop: 100,
    },
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    scrollData: {
        paddingTop: 80,
        //justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,

    },
    textareaStyle: {
        width: 320,
        marginBottom: 30,
    },
    cardActionStyle: {
        width: 300,
        marginTop: 20,
        marginBottom: 50,
    },
    fieldStyle: {
        height: 40,
        color: '#FFF',
        marginTop: 10,
        fontSize: 18,
    },

});