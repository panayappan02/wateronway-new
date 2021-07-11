import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View,Image,ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS, FONTFAMIY, FONTS, SIZES, icons} from '../constants';
import {Divider } from 'react-native-elements'

const Payments = () => {
  const userId = useSelector(state => state.user.userId);

  return (
    <View style={styles.Container}>
      <View style={styles.AppBarRow}>
       <Image source={icons.ChevronLeft} style={styles.chevronLeft} />
       <Text style={styles.appBarTitle}>Order Details</Text>
       <Text></Text>
      </View>

      <ScrollView style={styles.mainContainer}>

      <View style={styles.TitleRow}>
      <Text style={styles.OrderId} ellipsizeMode='tail' numberOfLines={1}>Order ID: FFF***JJSS</Text>
      <Text style={styles.OrderDate}>15/05/2021</Text>
      </View>

      <View style={styles.TitleRowwithLM}>
       <Text style={styles.DetailsTitle}>Seller Name: <Text style={styles.DetailsSubTitleBold}>RSV Waters</Text></Text>
       <Text style={styles.statusDelivered}>Delivered</Text>
       {/* <Text style={styles.statusOrdered}>Ordered</Text> */}
       {/* <Text style={styles.statusWarning}>CancelledBySeller</Text> */}       
       </View>
      
      <Divider/>
      
      <Text style={styles.InfoTitle}>Package Details</Text>

      <View style={styles.TitleRowwithLM}>
       <Text style={styles.DetailsTitle}>Product: <Text style={styles.DetailsSubTitleBold}>Mineral Water(20L)</Text></Text>
       <Text style={styles.DetailsTitle}>Quantity: <Text style={styles.DetailsSubTitleBold}>2 Nos</Text></Text>
       </View>

      <Divider/>
      <Text style={styles.InfoTitle}>Order Information</Text>

      <View style={styles.TitleRowwithLM}>
   <View style={styles.halfWidth}><Text style={styles.DetailsTitle}>Shipping Address:</Text></View>
   <View style={styles.halfWidth}><Text style={styles.DetailsSubTitleBold} ellipsizeMode='tail' numberOfLines={2}>1/91A, Nehru Street, Near Temple, Coimbatore</Text></View>
       </View>

       <View style={styles.TitleRowwithLM}>
   <View style={styles.halfWidth}><Text style={styles.DetailsTitle}>Payment Mode:</Text></View>
   <View style={styles.halfWidth}><Text style={styles.DetailsSubTitleBold} ellipsizeMode='tail' numberOfLines={2}>Cash On Delivery</Text></View>
       </View>

       <View style={styles.TitleRowwithLM}>
   <View style={styles.halfWidth}><Text style={styles.DetailsTitle}>Cart Total:</Text></View>
   <View style={styles.halfWidth}><Text style={styles.DetailsSubTitleBold} ellipsizeMode='tail' numberOfLines={2}>₹100</Text></View>
       </View>

       <View style={styles.TitleRowwithLM}>
   <View style={styles.halfWidth}><Text style={styles.DetailsTitle}>Delivery Charges:</Text></View>
   <View style={styles.halfWidth}><Text style={styles.DetailsSubTitleBold} ellipsizeMode='tail' numberOfLines={2}>₹10</Text></View>
       </View>

       <View style={styles.TitleRowwithLM}>
   <View style={styles.halfWidth}><Text style={styles.DetailsTitle}>Discount:</Text></View>
   <View style={styles.halfWidth}><Text style={styles.DetailsSubTitleBold} ellipsizeMode='tail' numberOfLines={2}>-₹10</Text></View>
       </View>

<Divider/>
       <View style={styles.TitleRowwithLM}>
   <View style={styles.halfWidth}><Text style={styles.totalText}>Total Amount:</Text></View>
   <View style={styles.halfWidth}><Text style={styles.totalText} ellipsizeMode='tail' numberOfLines={2}>₹100</Text></View>
       </View>


       <View style={styles.TitleRowwithLM}>
   <View style={styles.halfWidth}><View style={styles.cancelButton}><Text style={styles.cancelButtonText}>Cancel</Text></View></View>
   <View style={styles.halfWidth}><View style={styles.helpButton} onPress={()=> tawkTo(tawkToPropertyId, tawkToKey)}><Text style={styles.helpButtonText}>Need Help!</Text></View></View>
       </View>

        </ScrollView>
      
    </View>
  );
};

export default Payments;

const styles = StyleSheet.create({
  Container: {
    minHeight: '100%',
    backgroundColor: COLORS.BGColor
  },
  AppBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    backgroundColor: COLORS.white,
    padding: 16,
    elevation:3
  },
  chevronLeft: {
    width: 9.26,
    height: 16
  },
  appBarTitle: {
    color: COLORS.black2,
    ...FONTS.h3M,
    fontSize: 18,
    lineHeight: 22
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
    ...FONTS.h3M
  },
  OrderDate: {
    color: COLORS.gray5,
   ...FONTS.h4M
  },
  TitleRowwithLM: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
    marginBottom: 13,
    justifyContent: 'space-between',
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
    marginVertical: 16
  },
  halfWidth: {
    width: '50%'
  },
  totalText: {
    ...FONTS.h3M,
    color: COLORS.black2
  },
  cancelButton: {
    width: 160,
    height: 36,
    borderWidth: 1,
   borderColor: COLORS.black2,
   borderRadius: 24,
   alignItems:'center',
   justifyContent: 'center'
  },
  cancelButtonText: {
    ...FONTS.h4M,
    color: COLORS.black2
  },
  helpButton: {
    width: 160,
    height: 36,
    borderWidth: 1,
   borderColor: COLORS.primary,
   borderRadius: 24,
   alignItems:'center',
   justifyContent: 'center',
   backgroundColor: COLORS.primary,
   elevation: 1
  },
  helpButtonText: {
    ...FONTS.h4M,
    color: COLORS.white
  }
});
