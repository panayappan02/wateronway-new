import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {NavigationBar, Loading} from '../../components';
import {COLORS, FONTFAMIY} from '../../constants';
import {useSelector, useDispatch} from 'react-redux';
import {locationHelper} from '../../utils';
import MapView, {Marker} from 'react-native-maps';
import {
  useNavigation,
  useIsFocused,
  StackActions,
} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import {Button} from '../../components';
import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';
import {nanoid} from 'nanoid';

// COLLECTION
const usersCollection = firestore().collection('users');

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
];

const dropdownItems = [
  {
    label: 'Ground Floor',
    value: 0,
  },
  {
    label: '1St Floor',
    value: 1,
  },
  {
    label: '2nd Floor',
    value: 2,
  },
  {
    label: 'Above 2nd Floor',
    value: 3,
  },
];

const addressTypeList = ['HOME', 'OFFICE', 'OTHERS'];
const liftAvailableOptions = ['yes', 'no'];
const fontTheme = {
  fonts: {
    regular: {
      fontFamily: 'Metropolis-Regular',
    },
  },
};

const AddNewAddress = ({route}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user.userDetails);
  const userId = useSelector(state => state.user.userId);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const lat = route?.params?.lat;
  const lng = route?.params?.lng;
  const address = route?.params?.address;
  const [loading, setLoading] = useState(true);
  const [dropdown, setDropdown] = useState(0);
  const [isLiftAvailable, setIsLiftAvailable] = useState(
    liftAvailableOptions[0],
  );
  const [addressType, setAddressType] = useState(addressTypeList[0]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [values, setValues] = useState({
    fullName: userDetails?.name || '',
    mobileNumber: userDetails?.phoneNumber || '',
    doorNumber: '',
    street: '',
    landmark: '',
  });
  const [errorValues, setErrorValues] = useState({
    fullName: false,
    mobileNumber: false,
    doorNumber: false,
    street: false,
    landmark: false,
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const {fullName, mobileNumber, doorNumber, street, landmark} = values;

  useEffect(() => {
    initializeValues();
  }, [isFocused]);

  const initializeValues = async () => {
    try {
      const locationResponse = await locationHelper.getLocation();

      if (lat && lng) {
        setLatitude(lat);
        setLongitude(lng);
      } else {
        setLatitude(locationResponse.latitude);
        setLongitude(locationResponse.longitude);
      }

      setLoading(false);
    } catch (error) {
      console.log('ERROR IN INITIALIZEVALUES IN ADDNEWADDRESS ', error);
    }
  };

  const changeAddressType = newValue => {
    setAddressType(newValue);
  };
  const changeLiftAvailableOption = newValue => {
    setIsLiftAvailable(newValue);
  };

  const onSubmit = async () => {
    // let errorValuesRef = errorValues;

    // _.forOwn(values, function (value, key) {
    //   if (!value.length) {
    //     _.update(errorValuesRef, `${key}`, function () {
    //       return true;
    //     });
    //   }
    // });

    const data = {
      fullName,
      mobileNumber,
      AddressType: addressType,
      Dno: doorNumber,
      floor: dropdown,
      isLiftAvailable: isLiftAvailable,
      Landmark: landmark,
      Map: {
        AddressLine: address,
        Coordinates: new firestore.GeoPoint(
          Number(latitude),
          Number(longitude),
        ),
      },
      Street: street,
      address_id: nanoid(9),
      deleted: false,
    };

    try {
      if (btnLoading) return;
      setBtnLoading(true);

      if (!fullName || !mobileNumber || !doorNumber || !street || !landmark) {
        alert('Please Fill All Fields');
        setBtnLoading(false);
        return;
      } else {
        const userResponse = await usersCollection.doc(userId).get();
        if (userResponse.data()?.addresses?.length) {
          let addressesRef = userResponse.data()?.addresses;
          _.update(data, 'default', function () {
            return false;
          });
          addressesRef.push(data);

          await usersCollection.doc(userId).update({
            addresses: addressesRef,
          });
        } else {
          _.update(data, 'default', function () {
            return true;
          });
          await usersCollection.doc(userId).update({
            addresses: [data],
          });
        }
        setValues({...values, doorNumber: '', street: '', landmark: ''});
        navigation.dispatch(StackActions.replace('Checkout'));
      }
    } catch (error) {
      console.log('ERROR IN ONSUBMIT IN ADDNEWADDRESS JS ', error);
    } finally {
      setBtnLoading(false);
    }
  };

  // RENDER FUNCTIONS
  function renderDropdownItem(item) {
    return (
      <View style={styles.dropdownItem}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  }

  function renderForm() {
    return (
      <ScrollView>
        <View style={styles.formContainer}>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={{
                latitude: Number(latitude),
                longitude: Number(longitude),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                coordinate={{
                  latitude: Number(latitude),
                  longitude: Number(longitude),
                }}
              />
            </MapView>
          </View>

          <View style={[styles.inputContainer]}>
            <TextInput
              label="FULL NAME"
              style={styles.input}
              value={fullName}
              onChangeText={fullName => setValues({...values, fullName})}
              theme={fontTheme}
              error={errorValues.fullName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="MOBILE NUMBER"
              style={styles.input}
              value={mobileNumber}
              onChangeText={mobileNumber =>
                setValues({...values, mobileNumber})
              }
              theme={fontTheme}
              error={errorValues.mobileNumber}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="FLAT / HOUSE NO / BUILDING"
              style={styles.input}
              value={doorNumber}
              onChangeText={doorNumber => setValues({...values, doorNumber})}
              theme={fontTheme}
              error={errorValues.doorNumber}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="AREA / COLONY / STREET"
              style={styles.input}
              value={street}
              onChangeText={street => setValues({...values, street})}
              theme={fontTheme}
              error={errorValues.street}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              label="LAND MARK"
              style={styles.input}
              value={landmark}
              onChangeText={landmark => setValues({...values, landmark})}
              theme={fontTheme}
              error={errorValues.landmark}
            />
          </View>

          <View style={[styles.inputContainer]}>
            <RadioButton.Group
              onValueChange={newValue => changeAddressType(newValue)}
              value={addressType}>
              <View style={[styles.radioButtonContainer, {marginTop: '3%'}]}>
                {addressTypeList.map((addressType, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => changeAddressType(addressType)}
                      style={styles.radioButton}>
                      <RadioButton value={addressType} color={COLORS.primary} />
                      <Text style={styles.radioButtonText}>{addressType}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </RadioButton.Group>
          </View>

          <View style={[styles.inputContainer, {marginTop: '2%'}]}>
            <Dropdown
              data={dropdownItems}
              style={styles.dropdown}
              placeholder="SELECT ITEM"
              placeholderStyle={{
                fontSize: 18,
                color: COLORS.gray,
              }}
              fontFamily={FONTFAMIY.TTCommonsRegular}
              searchPlaceholder="Search"
              labelField="label"
              valueField="value"
              value={dropdown}
              onChange={item => {
                setDropdown(item.value);
              }}
              renderItem={item => renderDropdownItem(item)}
              maxHeight={200}
            />
          </View>

          {dropdown !== dropdownItems[0].value && (
            <View style={[styles.inputContainer, {marginTop: '2%'}]}>
              <RadioButton.Group
                onValueChange={newValue => changeLiftAvailableOption(newValue)}
                value={isLiftAvailable}>
                <Text style={styles.titleLabel}>Is Lift Available?</Text>
                <View style={[styles.radioButtonContainer, {width: '52%'}]}>
                  {liftAvailableOptions.map((option, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => changeAddressType(option)}
                        style={styles.radioButton}>
                        <RadioButton value={option} color={COLORS.primary} />
                        <Text style={styles.radioButtonText}>
                          {option.toUpperCase()}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </RadioButton.Group>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
  function renderSaveBtn() {
    return (
      <View style={styles.saveButtonContainer}>
        <Button
          onPress={onSubmit}
          label={'Continue'}
          loading={btnLoading}
          containerStyle={{
            borderRadius: 5,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar label="Adding Shipping Address" />
      <Loading loading={loading} color={COLORS.primary}>
        {renderForm()}
        {renderSaveBtn()}
      </Loading>
    </SafeAreaView>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: '3%',
  },
  formContainer: {
    paddingHorizontal: '5%',
  },
  inputContainer: {
    marginTop: '3%',
  },
  input: {
    backgroundColor: COLORS.white,
    fontSize: 15,
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: COLORS.lightGray3,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: '2%',
    marginTop: 20,
    paddingHorizontal: '3%',
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 15.5,
    color: COLORS.black1,
    fontFamily: FONTFAMIY.TTCommonsRegular,
  },
  mapContainer: {
    marginTop: '5%',
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  titleLabel: {
    marginVertical: '5%',
    marginLeft: '2%',
    fontSize: 16,
    color: COLORS.gray,
    fontFamily: FONTFAMIY.MetropolisMedium,
  },

  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  radioButtonText: {
    fontFamily: FONTFAMIY.MetropolisMedium,
    color: COLORS.black1,
  },
  saveButtonContainer: {
    paddingHorizontal: '5%',
  },
});
