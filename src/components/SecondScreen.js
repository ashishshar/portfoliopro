import React from 'react';
import { 
    StyleSheet, 
    ImageBackground, 
    ScrollView,
    View,
    Image,
    KeyboardAvoidingView, 
    Text } from 'react-native';
import { Container, Header, H1, Form, Item, Input, Label, Button, Body, Title, Textarea } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SecondScreen extends React.Component {
    static navigationOptions = {
        title: 'Bio'
    };
    state = {
        name: '',
        image: '',
        about: ''
    };
    componentWillMount(){
        const name = this.props.navigation.state.params.name;
        const image = this.props.navigation.state.params.image;
        this.setState({
            name: name,
            image: image
        });
    }
    render(){
        return(
            <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollData}>
                        <View style={styles.textareaStyle}>
                            <H1>Tell us about yourself</H1>
                        </View>
                        <View style={styles.textareaStyle}>
                            <Textarea 
                                rowSpan={7} 
                                bordered 
                                placeholder="Hey i am adam, i am love to play games"
                                style={{ fontSize:20}}
                                onChangeText={value => this.setState({ about: value })}
                                value = {this.state.about}
                            />
                        </View>
                        <View style={styles.cardActionStyle}>
                            <Button block onPress={() => this.props.navigation.navigate('Third',{
                                name: this.state.name, image: this.state.image, about:this.state.about
                                })}>
                                <Text style={styles.fieldStyle}>Next</Text>
                            </Button>
                            {/* {this.renderLoader()} */}
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
        width: 300,
        marginBottom: 30,
    },
    cardActionStyle:{
        width:300,
        marginTop:20,
        marginBottom:50,
    },
    fieldStyle: {
        height: 40,
        color: '#FFF',
        marginTop: 10,
        fontSize: 18,
    },

});