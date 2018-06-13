import React from 'react';
import { 
    StyleSheet, 
    View, 
    ScrollView, 
    ImageBackground,
    Image,
    WebView, 
    Linking
} from 'react-native';
import { Card, CardItem, Body, Button, Text, Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from './Loader';
import firebase from 'firebase';
const apiUrl = "https://portfoliopro-68771.firebaseapp.com/";
const data = '';
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
        header: null,
    };
    state = {
        loading: true,
        name:'',
        image:'',
        about:'',
        work:'',
        facebooklink:'',
        insta:'',
        linkedin:'',
        email:''
    };
    componentWillMount() {
        const phoneNumber = firebase.auth().currentUser.uid;//this.props.navigation.state.params.phoneNumber;
        const logincheck = fetch(apiUrl + 'getProfile', {
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
                    if (responseJson.data.name === ""){
                        this.props.navigation.navigate('First');
                    }else{
                        this.setState(
                            {
                                loading: false,
                                name: responseJson.data.name,
                                image: responseJson.data.image,
                                about: responseJson.data.about,
                                work: responseJson.data.work,
                                facebooklink: responseJson.data.facebooklink,
                                insta: responseJson.data.insta,
                                linkedin: responseJson.data.linkedin,
                                email: responseJson.data.email
                            }
                        );
                    }
                    
                }
                else {
                    this.setState({ loading: false });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    renderLoader = () => {
        if (this.state.loading) {
            return (
                <Loader size="large" />
            );
        } else {
            return (
                <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
                    <View>
                        <Image source={require('../assets/images/profilePic.jpg')} style={styles.profileImage} />
                    </View>
                    <Card style={styles.cardStyle}>
                        <CardItem>
                            <Body>
                                <Text style={styles.profileText}>
                                    Hey !!! my name is {this.state.name}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text style={styles.profileText}>
                                    {this.state.about}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={styles.cardStyle}>
                        <CardItem>
                            <Body>
                                <Text style={styles.profileText}>
                                    {this.state.work}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={styles.cardStyle}>
                        <CardItem style={styles.socialIcon}>
                            <Text style={{ fontSize: 22 }}>Connect - </Text> 
                            <Icon name="envelope" size={32} onPress={() => Linking.openURL(this.state.email)} >
                            </Icon>
                            <Icon name="facebook" size={32} onPress={() => Linking.openURL(this.state.facebooklink)} ></Icon>
                            <Icon name="instagram" size={32} onPress={() => Linking.openURL(this.state.insta)} ></Icon>
                            <Icon name="linkedin" size={32} onPress={() => Linking.openURL(this.state.linkedin)}  />
                        </CardItem>
                    </Card>
                    <Button style={{ alignSelf: 'center', marginTop: 10, marginBottom: 130 }} rounded onPress={() => this.props.navigation.navigate('Profile')}>
                        <Text>Edit</Text>
                    </Button>
                </ScrollView>
            );
        }
    }
    render() {
        return (
            <ImageBackground source={require('../assets/images/homeScreen.jpg')} style={styles.container}>
                <View>
                    {this.renderLoader()}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 20,
    },
    scrollview:{
        paddingTop: 80,
        paddingBottom: 60,
    },
    profileImage:{
        width:220,
        height:220,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 100,
        marginBottom: 20,
    },
    cardStyle:{
        width: 320,
        borderRadius: 45,
    },
    profileText:{
        fontSize: 22,
        lineHeight: 35,
    },
    socialIcon:{
        
    }
});
