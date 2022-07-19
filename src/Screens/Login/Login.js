import React, { useContext,useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLable from '../../Components/TextInputWithLabel';
import { AuthContext } from '../../Navigation/AuthProvider';
import validator from '../../utils/validations';
import { showError } from '../../utils/helperFunction';

const Login = ({ navigation }) => {
    const {login}=useContext(AuthContext);
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
        isSecure: true
    })
    const { isLoading, email, password, isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))


    const isValidData = () => {
        const error = validator({
            email,
            password
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onLogin = () => {
        const checkValid = isValidData()
        if (checkValid) {
            updateState({ isLoading: true })
            try {
                
                login(email,password)
               
                updateState({ isLoading: false })
            } catch (error) {
                console.log("error raised")
                showError(error.message)
                updateState({ isLoading: false })
            }

            // navigation.navigate('Signup')
        }
    }
    return (
        <View style={styles.container}>
             <View style={{margin:20}}>
                <Text style={{fontSize:30,textAlign:"center"}}>Login</Text>
            </View>
            <TextInputWithLable
                label="Email"
                placheHolder="enter your email"
                onChangeText={(email) => updateState({ email })}
            />
            <TextInputWithLable
                label="Password"
                placheHolder="enter your password"
                // isSecure={isSecure}
                secureTextEntry={isSecure}
                onChangeText={(password) => updateState({ password })}
            />

            <ButtonWithLoader
                text="Login"
                onPress={onLogin}
                isLoading={isLoading}
            />

            <View style={{marginVertical: 8}} />

            <ButtonWithLoader
                text="Signup"
                onPress={() => navigation.navigate('Signup')}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white'
    },
});


export default Login;
