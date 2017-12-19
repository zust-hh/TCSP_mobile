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
import Admin from './Admin';
import Regist from './Regist';
import { TeaNavigator, BasePage } from 'teaset';

class Login extends BasePage {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    static defaultProps = {
        scene: TeaNavigator.SceneConfigs.PushFromRight,
    };
    login = () => {
        fetch('http://192.168.1.113:8080/account/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: this.state.username,
                password: this.state.password
            }),
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status == 1) {
                    this.navigator.push({ view: <Admin /> })
                }
                else {
                    alert(res.message);
                }
            })
            .done();
    }
    render() {

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
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => this.navigator.push({ view: <Regist /> })}>
                            <Text>现在注册</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
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