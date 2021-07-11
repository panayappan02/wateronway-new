import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMIY, FONTS, SIZES} from '../../constants/theme';

const OrderCard = () => {
  return (
    <View style={styles.OrderCard}>
      <View style={styles.TitleRow}>
      <Text style={styles.OrderId} ellipsizeMode='tail' numberOfLines={1}>Mineral Water (20L)</Text>
      <Text style={styles.OrderDate}>15/05/2021</Text>
      </View>
     
     <View style={styles.CardDetailsContainer}>
       <Text style={styles.DetailsTitle}>Seller: <Text style={styles.DetailsSubTitle}>RSV Waters</Text></Text>

       <View style={styles.TitleRowwithM}>
       <Text style={styles.DetailsTitle}>Quantity: <Text style={styles.DetailsSubTitleBold}>3</Text></Text>
       <Text style={styles.DetailsTitle}>Total Amount: <Text style={styles.DetailsSubTitleBold}>₹113</Text></Text>
       </View>
     </View>

     <View style={styles.TitleRow}>
       <View style={styles.DetailsButton}><Text style={styles.DetailsButtonSubTitle}>Details</Text></View>
       <Text style={styles.statusDelivered}>Delivered</Text>
       {/* <Text style={styles.statusOrdered}>Ordered</Text> */}
       {/* <Text style={styles.statusWarning}>CancelledBySeller</Text> */}
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
     alignSelf:'center',
     marginTop: 24,
     borderRadius: 8,
     elevation: 7
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
    marginTop: 4
  },
  OrderId: {
    color: COLORS.black2,
    ...FONTS.h3M,
    width: 200,
    height: 16,
    overflow: 'hidden',
  },
  OrderDate:{
   color: COLORS.gray5,
   ...FONTS.h4M
  },
  CardDetailsContainer: {
    marginVertical: 15
  },
  DetailsTitle:{
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
   alignItems:'center',
   justifyContent: 'center'
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
  }
});
