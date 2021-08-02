import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS, FONTFAMIY, FONTS, SIZES, icons} from '../constants';
import {Divider} from 'react-native-elements';
import {NavigationBar} from '../components';
import {convertToddmmyy} from '../utils';

const OrderDetails = ({route}) => {
  const userId = useSelector(state => state.user.userId);
  const order = route?.params?.order;

  const {
    id: orderId,
    item: {
      Charges: {CartPrice, DC, Discount, Total},
      Seller,
      Product,
      Customer: {
        address: {Landmark, Dno, Street},
      },
      status,
      payment,
      oTime,
    },
  } = route?.params?.order;
  const date = convertToddmmyy(oTime);

  console.log('ORDER DETAILS ', order?.item);

  return (
    <View style={styles.Container}>
      <NavigationBar label="Order Details" />

      <ScrollView style={styles.mainContainer}>
        <View style={styles.TitleRow}>
          <Text style={styles.OrderId} ellipsizeMode="tail" numberOfLines={1}>
            Order ID: {orderId}
          </Text>
          <Text style={styles.OrderDate}>{date}</Text>
        </View>

        <View style={styles.TitleRowwithLM}>
          <Text style={styles.DetailsTitle}>
            Seller Name:{' '}
            <Text style={styles.DetailsSubTitleBold}>{Seller?.Name}</Text>
          </Text>
          <Text style={styles.statusDelivered}>{status}</Text>
          {/* <Text style={styles.statusOrdered}>Ordered</Text> */}
          {/* <Text style={styles.statusWarning}>CancelledBySeller</Text> */}
        </View>

        <Divider />

        <Text style={styles.InfoTitle}>Package Details</Text>

        <View style={styles.TitleRowwithLM}>
          <Text style={styles.DetailsTitle}>
            Product:{' '}
            <Text style={styles.DetailsSubTitleBold}>{Product?.Name}</Text>
          </Text>
          <Text style={styles.DetailsTitle}>
            Quantity:{' '}
            <Text style={styles.DetailsSubTitleBold}>{Product?.Count} Nos</Text>
          </Text>
        </View>

        <Divider />
        <Text style={styles.InfoTitle}>Order Information</Text>

        <View style={styles.TitleRowwithLM}>
          <View style={styles.halfWidth}>
            <Text style={styles.DetailsTitle}>Shipping Address:</Text>
          </View>
          <View style={styles.halfWidth}>
            <Text
              style={styles.DetailsSubTitleBold}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {`${Dno}  ${Street} ${Landmark}`}
            </Text>
          </View>
        </View>

        <View style={styles.TitleRowwithLM}>
          <View style={styles.halfWidth}>
            <Text style={styles.DetailsTitle}>Payment Mode:</Text>
          </View>
          <View style={styles.halfWidth}>
            <Text
              style={styles.DetailsSubTitleBold}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {payment?.paymentMode.charAt(0).toUpperCase() +
                payment?.paymentMode.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.TitleRowwithLM}>
          <View style={styles.halfWidth}>
            <Text style={styles.DetailsTitle}>Cart Total:</Text>
          </View>
          <View style={styles.halfWidth}>
            <Text
              style={styles.DetailsSubTitleBold}
              ellipsizeMode="tail"
              numberOfLines={2}>
              ₹{CartPrice}
            </Text>
          </View>
        </View>

        <View style={styles.TitleRowwithLM}>
          <View style={styles.halfWidth}>
            <Text style={styles.DetailsTitle}>Delivery Charges:</Text>
          </View>
          <View style={styles.halfWidth}>
            <Text
              style={styles.DetailsSubTitleBold}
              ellipsizeMode="tail"
              numberOfLines={2}>
              ₹{DC}
            </Text>
          </View>
        </View>

        <View style={styles.TitleRowwithLM}>
          <View style={styles.halfWidth}>
            <Text style={styles.DetailsTitle}>Discount:</Text>
          </View>
          <View style={styles.halfWidth}>
            <Text
              style={styles.DetailsSubTitleBold}
              ellipsizeMode="tail"
              numberOfLines={2}>
              -₹{Discount}
            </Text>
          </View>
        </View>

        <Divider />
        <View style={styles.TitleRowwithLM}>
          <View style={styles.halfWidth}>
            <Text style={styles.totalText}>Total Amount:</Text>
          </View>
          <View style={styles.halfWidth}>
            <Text
              style={styles.totalText}
              ellipsizeMode="tail"
              numberOfLines={2}>
              ₹{Total}
            </Text>
          </View>
        </View>

        <View style={styles.TitleRowwithLM}>
          <View style={styles.halfWidth}>
            <View style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </View>
          </View>
          <View style={styles.halfWidth}>
            <View
              style={styles.helpButton}
              onPress={() => tawkTo(tawkToPropertyId, tawkToKey)}>
              <Text style={styles.helpButtonText}>Need Help!</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  Container: {
    minHeight: '100%',
    backgroundColor: COLORS.BGColor,
  },
  AppBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    backgroundColor: COLORS.white,
    padding: 16,
    elevation: 3,
  },
  chevronLeft: {
    width: 9.26,
    height: 16,
  },
  appBarTitle: {
    color: COLORS.black2,
    ...FONTS.h3M,
    fontSize: 18,
    lineHeight: 22,
  },
  mainContainer: {
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  TitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  OrderId: {
    ...FONTS.h3M,
    width: '70%',
  },
  OrderDate: {
    color: COLORS.gray5,
    ...FONTS.h4M,
  },
  TitleRowwithLM: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
    marginBottom: 13,
    justifyContent: 'space-between',
  },
  DetailsTitle: {
    ...FONTS.h4M,
    color: COLORS.gray5,
  },
  DetailsSubTitle: {
    ...FONTS.h4SB,
    color: COLORS.black2,
  },
  DetailsSubTitleBold: {
    ...FONTS.h4M,
    color: COLORS.black2,
    //   alignSelf: 'flex-start'
  },
  statusDelivered: {
    ...FONTS.h4M,
    color: COLORS.success,
  },
  statusOrdered: {
    ...FONTS.h4M,
    color: COLORS.primary,
  },
  statusWarning: {
    ...FONTS.h4M,
    color: COLORS.warning,
  },
  InfoTitle: {
    ...FONTS.h4M,
    marginVertical: 16,
  },
  halfWidth: {
    width: '50%',
  },
  totalText: {
    ...FONTS.h3M,
    color: COLORS.black2,
  },
  cancelButton: {
    width: 160,
    height: 36,
    borderWidth: 1,
    borderColor: COLORS.black2,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    ...FONTS.h4M,
    color: COLORS.black2,
  },
  helpButton: {
    width: 160,
    height: 36,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    elevation: 1,
  },
  helpButtonText: {
    ...FONTS.h4M,
    color: COLORS.white,
  },
});
