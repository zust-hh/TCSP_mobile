import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Button,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    
    ComponentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var value = await AsyncStorage.getItem('user');
        if (value !== null) {
            this.props.navigation.navigate('Home');
        }
    }
    // static navigationOptions = {
    //     header: false
    // }

    render() {
        // const { navigate } = this.props.navigation;
        return (
            <View style={styles.views}>
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps={'always'}
                >
                    <View style={styles.container}>
                        <Text style={styles.header}>- LOGIN -</Text>
                        <TextInput
                            style={styles.textInput} placeholder='Username'
                            onChangeText={(username) => this.setState({ username })}
                            underlineColorAndroid='transparent'
                        />
                        <TextInput
                            style={styles.textInput} placeholder='Password'
                            onChangeText={(password) => this.setState({ password })}
                            underlineColorAndroid='transparent'
                        />
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.login}>
                            <Text>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    login = () => {
        this.props.navigation.navigate('Home');
        // fetch('http://baidu.com', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         username: this.state.username,
        //         password: this.state.password
        //     })
        // })
        //     .then((response) => response.json())
        //     .then((res) => {
        //         if (res.success === true) {
        //             AsyncStorage.setItem('user', res.user);
        //             this.props.navigation.navigate('Home');
        //         }
        //         else {
        //             alert(res.message);
        //         }
        //     })
        //     .done();
    }
}

const styles = StyleSheet.create({
    views: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2896d3',
        paddingLeft: 40,
        paddingRight: 40
    },
    header: {
        fontSize: 24,
        marginBottom: 60,
        color: '#fff',
        fontWeight: 'bold'
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    btn: {
        alignSelf: 'stretch',
        padding: 20,
        backgroundColor: '#01c853',
        alignItems: 'center',
    },
});
module.exports = Login;