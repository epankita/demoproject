import React, { useState } from 'react';
import { View } from 'react-native';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import styles from '../EditProduct/styles';
import InternetConnectionAlert from "react-native-internet-connection-alert";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions/product";
import { showMessage } from 'react-native-flash-message';

const SaveProduct = ({ navigation }) => {
    const [state, setState] = useState({
        isLoading: false,
        id: '',
        name: '',
        offerprice: '',
        price: '',
        isSecure: true
    })
    const updateState = (data) => setState(() => ({ ...state, ...data }))
    const { isLoading, name, offerprice, price, id } = state
    const initialProductState = {
        'name': name,
        'offerprice': offerprice,
        'price': price
    }
    const [product, setProduct] = useState(initialProductState);
    const dispatch = useDispatch();

    const saveProduct = () => {
        updateState({ isLoading: true })
        dispatch(createProduct(product))
            .then(data => {
                updateState({
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    offerprice: data.offerprice
                });
                updateState({ isLoading: false })
                showMessage("Saved successfully...!!!!")
                navigation.goBack()
                console.log(data);
            })
            .catch(e => {
                updateState({ isLoading: false })
                console.log(e);
            });
    };
    return (

        <InternetConnectionAlert
            onChange={(connectionState) => {
            }}
        >
            <View style={styles.container}>
                
                <TextInputWithLabel
                    label="Product Name"
                    placeHolder='Enter Product Name'
                    inputStyle={{ marginBottom: moderateVerticalScale(28) }}
                    keyboardType='default'
                    onChangeText={(name) => updateState({ name })}
                />
                <TextInputWithLabel
                    label="Price"
                    placeHolder='Enter Price'
                    inputStyle={{ marginBottom: moderateVerticalScale(28) }}
                    keyboardType='number'
                    onChangeText={(price) => updateState({ price })}
                />
                <TextInputWithLabel
                    label="Offer Price"
                    placeHolder='Enter Offer Price'
                    inputStyle={{ marginBottom: moderateVerticalScale(28) }}
                    keyboardType='default'
                    onChangeText={(offerprice) => updateState({ offerprice })}
                />
                <ButtonWithLoader
                    text="Submit"
                    onPress={() => saveProduct()}
                    isLoading={isLoading}
                />
            </View>
        </InternetConnectionAlert>
    );
};


export default SaveProduct;

