import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS, FONTFAMIY, FONTS, SIZES, icons} from '../constants';
import {Divider} from 'react-native-elements';
import {Button, Loading, VectorIcon} from '../components';
import {SafeAreaView} from 'react-native';
import {customerPayment} from '../helper/api';
import {useIsFocused} from '@react-navigation/native';

const Payments = () => {
  const isFocused = useIsFocused();
  const userId = useSelector(state => state.user.userId);
  const [loading, setLoading] = useState(true);
  const [totalVendors, setTotalVendors] = useState(null);
  const [totalPendingAmount, setTotalPendingAmount] = useState(null);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    getPaymentInfo();
  }, [isFocused]);

  const getPaymentInfo = async () => {
    try {
      const res = await customerPayment();
      if (res?.status === 'success') {
        setTotalVendors(res?.response?.data?.CustomerPayment?.totalVendors);
        setTotalPendingAmount(
          res?.response?.data?.CustomerPayment?.totalPendingAmount,
        );
        setPayments(res?.response?.data?.CustomerPayment?.payments);
      }
    } catch (error) {
      console.log('ERROR IN GETPAYMENTINFO IN PAYMENTS.JS ', error);
    } finally {
      setLoading(false);
    }
  };

  function renderPaymentList() {
    return (
      <View>
        <FlatList
          data={payments}
          keyExtractor={(item, index) => `payment-card-${index}`}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity>
                  <View style={styles.TitleRowwithLM}>
                    <Text style={styles.DetailsTitle}>
                      <Text style={styles.DetailsSubTitleBold}>
                        {item?.seller?.name}
                      </Text>
                    </Text>
                    <Text style={styles.amountText}>
                      ₹<Text>{item?.pendingAmount}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
                <Divider />
              </>
            );
          }}
        />
      </View>
    );
  }

  return (
    <Loading loading={loading} color={COLORS.primary}>
      <View style={styles.Container}>
        <Text style={styles.title}>Pending Payments</Text>
        {userId != null ? (
          <ScrollView style={styles.mainContainer}>
            <View style={styles.TitleRowwithLM}>
              <View style={styles.vendorsLeftContainer}>
                <Image
                  source={icons.sellerGroup}
                  style={{width: 42, height: 42}}
                />
                <Text style={styles.vendorsTitle}>{totalVendors}</Text>
                <Text style={styles.vendorsSubTitle}>Vendors To Pay</Text>
              </View>
              <View style={styles.totalPendingContainer}>
                <Image source={icons.wallet} style={{width: 42, height: 42}} />
                <Text style={styles.vendorsTitle}>
                  ₹<Text>{totalPendingAmount}</Text>
                </Text>
                <Text style={styles.vendorsSubTitle}>Total Pending</Text>
              </View>
            </View>

            {renderPaymentList()}
          </ScrollView>
        ) : (
          <Text style={styles.loginText}>
            Please Login to see your payments!
          </Text>
        )}
      </View>
    </Loading>
  );
};

export default Payments;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingBottom: 70,
    backgroundColor: COLORS.BGColor,
  },
  vendorsLeftContainer: {
    width: '48%',
    height: 164,
    backgroundColor: COLORS.white,
    elevation: 3,
    borderRadius: 13,
    padding: 20,
  },
  totalPendingContainer: {
    width: '48%',
    height: 164,
    backgroundColor: COLORS.white,
    elevation: 3,
    borderRadius: 13,
    padding: 20,
  },
  vendorsTitle: {
    marginTop: 40,
    ...FONTS.h3M,
  },
  vendorsSubTitle: {
    marginTop: 11,
    color: COLORS.gray5,
    ...FONTS.h4M,
  },
  title: {
    ...FONTS.h1M,
    color: COLORS.black2,
    // marginVertical: SIZES.base,
    // marginLeft: 5,
    margin: 14,
    marginTop: 20,
  },
  loginText: {
    color: COLORS.gray5,
    ...FONTS.h4M,
    marginLeft: 20,
  },
  OrderId: {
    ...FONTS.h3M,
  },
  OrderDate: {
    color: COLORS.gray5,
    ...FONTS.h4M,
  },
  TitleRowwithLM: {
    flexDirection: 'row',
    alignItems: 'center',
    //  marginTop: 13,
    // marginBottom: 13,
    margin: 10,
    justifyContent: 'space-between',
    padding: 10,
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
  amountText: {
    ...FONTS.h4M,
    color: COLORS.warning,
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
});
