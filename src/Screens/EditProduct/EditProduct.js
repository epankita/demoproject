import React, { useState } from 'react';
import { View } from 'react-native';
import TextInputWithLabel from '../../Components/TextInputWithLabel';
import { moderateVerticalScale, scale } from 'react-native-size-matters';
import ButtonWithLoader from '../../Components/ButtonWithLoader';
import { showMessage } from 'react-native-flash-message';
import styles from './styles';
import InternetConnectionAlert from "react-native-internet-connection-alert";
import { updateProduct } from "../../redux/actions/product";
import { useDispatch } from "react-redux";

const EditProduct = ({ route }) => {
    const editdata = route.params.item
    const [state, setState] = useState({
        isLoading: false,
        name: '',
        offerprice: '',
        price: '',
        isSecure: true
    })
    const updateState = (data) => setState(() => ({ ...state, ...data }))
    const dispatch = useDispatch();
    const { isLoading, name, offerprice, price } = state

  
    const updateData = status => {
        const data = {
          id: editdata.id,
          'name': name,
          'price': price,
          'offerprice': offerprice
        };
        updateState({ isLoading: true })
        dispatch(updateProduct(editdata.id, data))
          .then(response => {
            console.log(response);
            updateState({ isLoading: false })
            showMessage("Updated successfully...!!!!")
            navigation.goBack()
           
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
                    defaultValue={editdata.name}
                    onChangeText={(name) => updateState({ name })}
                />
                <TextInputWithLabel
                    label="Price"
                    placeHolder='Enter Price'
                    inputStyle={{ marginBottom: moderateVerticalScale(28) }}
                    keyboardType='number'
                    defaultValue={editdata.price}

                    onChangeText={(price) => updateState({ price })}
                />
                <TextInputWithLabel
                    label="Offer Price"
                    placeHolder='Enter Offer Price'
                    inputStyle={{ marginBottom: moderateVerticalScale(28) }}
                    keyboardType='default'
                    defaultValue={editdata.offerprice}
                    onChangeText={(offerprice) => updateState({ offerprice })}
                />
                <ButtonWithLoader
                    text=" Save Changes"
                    onPress={() => updateData}
                    isLoading={isLoading}
                />
            </View>
        </InternetConnectionAlert>
    );
};


export default EditProduct;

