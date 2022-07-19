import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import TextInputWithLable from '../../Components/TextInputWithLabel';

import validator from '../../utils/validations';
import { showError } from '../../utils/helperFunction';
import { showMessage } from 'react-native-flash-message';
import { AuthContext } from '../../Navigation/AuthProvider';




const Signup = ({ navigation }) => {
    const {register}=useContext(AuthContext);
    const [state, setState] = useState({
        isLoading: false,
        // userName: '',
        email: '',
        password: '',
        isSecure: true
    })
    const { isLoading, email, password, isSecure } = state
    const updateState = (data) => setState(() => ({ ...state, ...data }))


    const isValidData = () => {
        const error = validator({
            // userName,
            email,
            password
        })
        if (error) {
            showError(error)
            return false
        }
        return true
    }

    const onSignup = async () => {
        const checkValid = isValidData()
        if (checkValid) {
            updateState({ isLoading: true })
            try {
                const res=  register(email,password)
                showMessage("Registered successfully...!!!!")
                updateState({ isLoading: false })
                navigation.goBack()
            } catch (error) {
                console.log("error raised")
                showError(error.message)
                updateState({ isLoading: false })
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={{margin:20}}>
                <Text style={{fontSize:30,textAlign:"center"}}>Sign Up</Text>
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
                text="Signup"
                onPress={onSignup}
                // onPress={()=>register(email,password)}

                isLoading={isLoading}
            />
              <ButtonWithLoader
                text="Login"
                onPress={() => navigation.navigate('Login')}
                isLoading={isLoading}
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


export default Signup;
