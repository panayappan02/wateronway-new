import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import {Loading, OrderCard, VectorIcon} from '../components';
import {COLORS, FONTFAMIY, FONTS, SIZES} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

// COLLECTION
import firestore from '@react-native-firebase/firestore';
const orderCollection = firestore().collection('orders');

const Orders = () => {
  const isFocused = useIsFocused();
  const userId = useSelector(state => state.user.userId);
  const [orderList, setOrderList] = useState([]);
  const [limit, setLimit] = useState(4);
  const [listLoading, setListLoading] = useState(false);

  useEffect(() => {
    getOrdersData();
  }, [isFocused]);

  const getOrdersData = () => {
    console.log('USER ID FROM ORDER TAB ', userId);
    if (userId != null) {
      orderCollection
        .where('Customer.id', '==', userId.toString())
        .orderBy('oTime', 'desc')
        .limit(limit)
        .onSnapshot(snapshot => {
          setOrderList(
            snapshot.docs.map(doc => ({id: doc.id, item: doc.data(), doc})),
          );
        });
    }
    setListLoading(false);
  };

  const onEndReached = () => {
    setListLoading(true);
    setTimeout(() => {
      orderCollection
        .where('Customer.id', '==', userId)
        .orderBy('oTime', 'desc')
        .startAfter(orderList[orderList.length - 1].doc)
        .limit(limit)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length) {
            var newOrderListRef = snapshot.docs.map(doc => ({
              id: doc.id,
              item: doc.data(),
              doc,
            }));
            setOrderList([...orderList, ...newOrderListRef]);
          }
        });
      setListLoading(false);
    }, 1000);
  };

  function renderOrderList() {
    function renderOrderCard({item, index}) {
      return (
        <OrderCard order={item} lastItem={orderList.length - 1 === index} />
      );
    }

    return (
      <>
        <View style={[styles.orderListContainer]}>
          <FlatList
            data={orderList}
            keyExtractor={(item, index) => `order-card-${index}`}
            renderItem={renderOrderCard}
            onEndReachedThreshold={0}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Loading
          loading={listLoading}
          color={COLORS.primary}
          type={'ThreeBounce'}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {userId != null ? (
        renderOrderList()
      ) : (
        <Text style={styles.loginText}>Please login to see your orders!</Text>
      )}
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    paddingBottom: 70,
    //   backgroundColor: COLORS.white,
    backgroundColor: COLORS.BGColor,
  },
  title: {
    ...FONTS.h1M,
    color: COLORS.black2,
    marginVertical: SIZES.base,
    marginLeft: 5,
  },
  orderListContainer: {
    height: '90%',
  },
  loginText: {
    color: COLORS.gray5,
    ...FONTS.h4M,
  },
});
