import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMIY, FONTS, SIZES} from '../../constants/theme';
import {convertToddmmyy} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const OrderCard = ({order, lastItem}) => {
  const date = convertToddmmyy(order?.item?.oTime);
  const navigation = useNavigation();

  const navigateToOrderDetails = () => {
    navigation.navigate('OrderDetails', {
      order,
    });
  };

  return (
    <View style={[styles.OrderCard, {marginBottom: lastItem ? 15 : 0}]}>
      <View style={styles.TitleRow}>
        <Text style={styles.OrderId} ellipsizeMode="tail" numberOfLines={1}>
          {order?.item?.Product?.Name}
        </Text>
        <Text style={styles.OrderDate}>{date}</Text>
      </View>

      <View style={styles.CardDetailsContainer}>
        <Text style={styles.DetailsTitle}>
          Seller:{' '}
          <Text style={styles.DetailsSubTitle}>
            {order?.item?.Seller?.Name}
          </Text>
        </Text>

        <View style={styles.TitleRowwithM}>
          <Text style={styles.DetailsTitle}>
            Quantity:{' '}
            <Text style={styles.DetailsSubTitleBold}>
              {order?.item?.Product?.Count}
            </Text>
          </Text>
          <Text style={styles.DetailsTitle}>
            Total Amount:{' '}
            <Text style={styles.DetailsSubTitleBold}>
              ₹{order?.item?.Charges?.Total}
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.TitleRow}>
        <TouchableOpacity
          onPress={navigateToOrderDetails}
          style={styles.DetailsButton}>
          <Text style={styles.DetailsButtonSubTitle}>Details</Text>
        </TouchableOpacity>
      {order?.item?.status == 'Delivered'?  <Text style={styles.statusDelivered}>{order?.item?.status}</Text>:<>
      {order?.item?.status == 'Ordered'?  <Text style={styles.statusOrdered}>{order?.item?.status}</Text>:
      <Text style={styles.statusWarning}>{order?.item?.status}</Text>}
      </>}
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  OrderCard: {
    width: 343,
    height: 164,
    padding: 18,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    marginTop: 24,
    borderRadius: 8,
    elevation: 7,
  },
  TitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TitleRowwithM: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  OrderId: {
    color: COLORS.black2,
    ...FONTS.h3M,
    width: 200,
    height: 16,
    overflow: 'hidden',
  },
  OrderDate: {
    color: COLORS.gray5,
    ...FONTS.h4M,
  },
  CardDetailsContainer: {
    marginVertical: 15,
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
    ...FONTS.h3M,
    color: COLORS.black2,
  },
  DetailsButton: {
    width: 96,
    height: 36,
    borderWidth: 1,
    borderColor: COLORS.black2,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DetailsButtonSubTitle: {
    ...FONTS.h4MSB,
    color: COLORS.black2,
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
});
