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
import firestore from '@react-native-firebase/firestore';

// COLLECTION
const orderCollection = firestore().collection('orders');

const Orders = () => {
  const userId = useSelector(state => state.user.userId);
  const [orderList, setOrderList] = useState([]);
  const [limit, setLimit] = useState(4);
  const [listLoading, setListLoading] = useState(false);

  useEffect(() => {
    getOrdersData();
  }, [limit]);

  const getOrdersData = () => {
    orderCollection
      .where('Customer.id', '==', userId)
      .orderBy('oTime', 'desc')
      .limit(limit)
      .onSnapshot(snapshot => {
        setOrderList(
          snapshot.docs.map(doc => ({id: doc.id, item: doc.data()})),
        );
      });
    setListLoading(false);
  };

  const onEndReached = () => {
    setListLoading(true);
    setTimeout(() => {
      setLimit(limit + 4);
    }, 500);
  };

  function renderOrderList() {
    function renderOrderCard({item, index}) {
      return (
        <OrderCard order={item} lastItem={orderList.length - 1 === index} />
      );
    }

    return (
      <>
        <View style={styles.orderListContainer}>
          <FlatList
            data={orderList}
            keyExtractor={(item, index) => `order-card-${index}`}
            renderItem={renderOrderCard}
            onEndReachedThreshold={0}
            onEndReached={onEndReached}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Loading loading={listLoading} color={COLORS.primary} />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      {renderOrderList()}
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
});
