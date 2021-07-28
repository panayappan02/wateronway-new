import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  AddressCard,
  Button,
  Loading,
  NavigationBar,
  VectorIcon,
} from '../components';
import {COLORS, FONTFAMIY} from '../constants';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  useNavigation,
  StackActions,
  CommonActions,
} from '@react-navigation/native';
import {locationHelper} from '../utils';
import _ from 'lodash';

// COLLECTION
const usersCollection = firestore().collection('users');

const AddressList = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const userId = useSelector(state => state.user.userId);
  const [loading, setLoading] = useState(true);
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [defaultAddressRef, setDefaultAddressRef] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    getAddressData();
  }, [isFocused]);

  const getAddressData = async () => {
    try {
      const userResponse = await usersCollection.doc(userId).get();
      if (userResponse.data()?.addresses) {
        let reverseAddressList = _.reverse(userResponse.data()?.addresses);
        setAddressList(reverseAddressList);
        const defaultAddress = _.find(
          userResponse.data()?.addresses,
          function (address) {
            return address.default === true;
          },
        );
        setSelectedAddress(defaultAddress);
        setDefaultAddressRef(defaultAddress);
      }
    } catch (error) {
      console.log('ERROR IN GETADDRESSDATA IN ADDRESSLIST JS ', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToAddNewAddress = async () => {
    try {
      const locationResponse = await locationHelper.getLocation();

      navigation.navigate('LocationSelection', {
        to: 'AddNewAddress',
        lat: locationResponse.latitude,
        lng: locationResponse.longitude,
        navigationBar: true,
      });
    } catch (error) {
      console.log('ERROR IN NAVIGATETOADDNEWADDRESS IN ADDRESSLIST JS ', error);
    }
  };

  const onSubmit = async () => {
    if (btnLoading) return;
    setBtnLoading(true);
    const popAction = CommonActions.reset({
      index: 1,
      routes: [{name: 'Tabs'}, {name: 'Checkout'}],
    });

    try {
      if (selectedAddress?.address_id === defaultAddressRef?.address_id) {
        navigation.dispatch(popAction);
      } else {
        let addressListRef = addressList;
        let defaultAddressIndex = _.findIndex(
          addressListRef,
          function (address) {
            return address.default === true;
          },
        );

        let selectedAddressIndex = _.findIndex(
          addressListRef,
          function (address) {
            return address.address_id === selectedAddress?.address_id;
          },
        );

        addressListRef[defaultAddressIndex] = {
          ...addressListRef[defaultAddressIndex],
          default: false,
        };

        addressListRef[selectedAddressIndex] = {
          ...addressListRef[selectedAddressIndex],
          default: true,
        };

        await usersCollection.doc(userId).update({
          addresses: addressListRef,
        });

        navigation.dispatch(popAction);
      }
    } catch (error) {
      console.log('ERROR IN ONSUBMIT IN ADDRESSLIST JS ', error);
    } finally {
      setBtnLoading(false);
    }
  };

  function renderAddNewAddressBtn() {
    return (
      <View style={styles.addNewAddressBtnWrapper}>
        <TouchableOpacity
          onPress={navigateToAddNewAddress}
          style={styles.addNewAddressBtn}
          activeOpacity={0.5}>
          <VectorIcon.AntDesign name="plus" color={COLORS.primary} size={20} />
          <Text style={styles.addNewAddressBtnText}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderAddressList() {
    return (
      <View style={styles.addressListContainer}>
        <FlatList
          data={addressList}
          keyExtractor={(item, index) => `address-card-${index}`}
          renderItem={({item, index}) => (
            <View
              style={[
                styles.addressCardWrapper,
                {marginTop: index === 0 ? '3%' : '5%'},
              ]}>
              <AddressCard
                address={item}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
            </View>
          )}
        />
      </View>
    );
  }

  function renderContinueBtn() {
    return (
      <View style={styles.btnContainer}>
        <Button
          onPress={onSubmit}
          label="Continue"
          loading={btnLoading}
          containerStyle={{
            width: '90%',
            borderRadius: 5,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar label="Shipping Addresses" />
      <Loading loading={loading} color={COLORS.primary}>
        {renderAddNewAddressBtn()}
        {renderAddressList()}
        {renderContinueBtn()}
      </Loading>
    </SafeAreaView>
  );
};

export default AddressList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  addressListContainer: {
    backgroundColor: COLORS.white,
    paddingBottom: '50%',
  },
  addressCardWrapper: {
    margin: '5%',
  },
  addNewAddressBtnWrapper: {
    alignItems: 'flex-end',
    marginRight: '5%',
    marginVertical: '2%',
  },
  addNewAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: COLORS.primary,
    padding: 5,
  },
  addNewAddressBtnText: {
    fontFamily: FONTFAMIY.MetropolisRegular,
    color: COLORS.primary,
    marginLeft: '1%',
  },
  btnContainer: {
    position: 'absolute',
    bottom: '3%',
    width: '100%',
    alignItems: 'center',
  },
});
