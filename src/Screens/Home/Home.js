//import liraries
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { retrieveProducts, deleteProduct } from '../../redux/actions/product';
import { useSelector, useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// create a component
const Home = ({ navigation }) => {
  const [listData, setListData] = useState([
    { id: 1, name: "Mobile", image: "https://img.icons8.com/clouds/100/000000/groups.png", price: "12471", offerprice: "10000" },
    { id: 2, name: "TV", image: "https://img.icons8.com/color/100/000000/real-estate.png", price: "23472", offerprice: "20000" },
    { id: 3, name: "Fan", image: "https://img.icons8.com/color/100/000000/find-matching-job.png", price: "32472", offerprice: "30000" },
  ]
  );
  //   const products = useSelector(state => state.productsReducer);
  const dispatch = useDispatch();
  const ProductList = useSelector(state => state.product);
  useEffect(() => {
    dispatch(retrieveProducts());
  }, []);
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.id === rowKey);
    newData.splice(prevIndex, 1);

    dispatch(deleteProduct(rowKey))
      .then(response => {
        console.log(response);
        showMessage("Removed successfully...!!!!")
      })
      .catch(e => {
        console.log(e);
      });

    setListData(newData);
  };

  const VisibleItem = props => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[styles.rowFront, { height: rowHeightAnimatedValue }]}>
        <TouchableHighlight
          style={styles.rowFrontVisible}
          onPress={() => console.log('Element touched')}
          underlayColor={'#aaa'}>
          <View style={styles.nameContainer} >
            <Image source={{ uri: data.item.image }} style={styles.pic} />
            <View style={{ marginLeft: 10 }}>
              <View style={[styles.nameContainer]} >
                <Text style={styles.title} numberOfLines={1}>
                  {data.item.name}
                </Text>
              </View>
              <View style={styles.nameContainer} >
                <Text style={[styles.details, { textDecorationLine: 'line-through' }]} numberOfLines={1}>
                  {data.item.price}
                </Text>
                <Text style={[styles.details, { marginLeft: 10 }]} numberOfLines={1}>
                  ₹ {data.item.offerprice}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{ marginRight: 30 }} onPress={() => navigation.navigate('EditProduct', { item: data.item })} >
              <FontAwesome
                name="edit"
                size={20}
                color="blue"
              />
            </TouchableOpacity>
          </View>

        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.id)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false
      }).start();
    }

    return (
      <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnLeft]}
            onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              styles.backRightBtn,
              styles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}

      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => closeRow(rowMap, data.item.id)}
        onDelete={() => deleteRow(rowMap, data.item.id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />

      <TouchableOpacity style={styles.bottomright} onPress={() => navigation.navigate('SaveProduct')}>
        <AntDesign
          style={{
            shadowColor: '#999',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            elevation: 15
          }}
          name="pluscircle"
          size={50}
          color="blue"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
