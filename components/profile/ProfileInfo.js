// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Linking,
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {COLORS, FONTFAMIY, FONTS, icons, SIZES} from '../../constants';
// import {userHelper} from '../../utils';
// import firestore from '@react-native-firebase/firestore';
// import {useNavigation} from '@react-navigation/native';
// import {useIsFocused} from '@react-navigation/native';
// import {Button, Loading, VectorIcon} from '..';

// // redux
// import {useSelector, useDispatch} from 'react-redux';
// import {setUserId} from '../../redux/userSlice';

// // Collection
// const usersCollection = firestore().collection('users');

// const ProfileInfo = () => {
//   const navigation = useNavigation();
//   const userId = useSelector(state => state.user.userId);
//   const dispatch = useDispatch();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [logoutLoading, setLogoutLoading] = useState(false);

//   useEffect(() => {
//     getUserDetails();
//   }, []);

//   const getUserDetails = async () => {
//     // const userId = await userHelper.getUserId();
//     usersCollection.doc(userId).onSnapshot(snapshot => {
//       setName(snapshot.data()?.name);
//       setEmail(snapshot.data()?.email);
//       setPhoneNumber(snapshot.data()?.phoneNumber);
//       setLoading(false);
//     });
//   };

//   const logout = async () => {
//     if (logoutLoading) return;
//     setLogoutLoading(true);
//     dispatch(setUserId(null));
//     await userHelper.removeUserId();
//     auth().signOut();
//   };

// const navigateToOrders = () => {
//   navigation.navigate('Orders');
// };

// const openGetHelp = async () => {
//   try {
//     await Linking.openURL(
//       'https://tawk.to/chat/5f9401572915ea4ba09659cf/default',
//     );
//   } catch (error) {
//     console.log('ERROR GETHELP ', error);
//   }
// };

// function renderContact() {
//   return (
//     <View style={styles.contactWrapper}>
//       <View style={{...styles.row, ...styles.contactContainer}}>
//         <View style={styles.contactIconContainer}>
//           <VectorIcon.Feather name="mail" size={20} color={COLORS.white} />
//         </View>
//         <Text style={styles.contact}>{email}</Text>
//       </View>
//       <View style={{...styles.row, ...styles.contactContainer}}>
//         <View style={styles.contactIconContainer}>
//           <VectorIcon.Feather name="phone" size={20} color={COLORS.white} />
//         </View>
//         <Text style={styles.contact}>{phoneNumber}</Text>
//       </View>
//     </View>
//   );
// }

// function renderCards() {
//   return (
//     <View style={styles.cardWrapper}>
//       <TouchableOpacity
//         onPress={navigateToOrders}
//         style={styles.cardContainer}>
//         <Image source={icons.myOrders} style={styles.cardIcon} />
//         <View style={styles.cardContent}>
//           <Text style={styles.cardTitle}>My Orders</Text>
//           <Text style={styles.cardDesc}>Check Your Order Status</Text>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={openGetHelp} style={styles.cardContainer}>
//         <Image source={icons.getHelp} style={styles.cardIcon} />
//         <View style={styles.cardContent}>
//           <Text style={styles.cardTitle}>Get Help</Text>
//           <Text style={styles.cardDesc}>We are available for you 24*7!</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// }

// function renderLogout() {
//   return (
//     <View style={styles.logoutBtnContainer}>
//       <Button
//         onPress={logout}
//         loading={logoutLoading}
//         containerStyle={{
//           height: 35,
//           width: 150,
//           backgroundColor: COLORS.white,
//           borderWidth: 1,
//           borderRadius: 0,
//           borderColor: COLORS.primary,
//           marginTop: 50,
//         }}
//         label="Logout"
//         labelStyle={{
//           color: COLORS.primary,
//           fontFamily: FONTFAMIY.TTCommonsRegular,
//         }}
//       />
//     </View>
//   );
// }

//   if (loading)
//     return (
//       <View style={styles.container}>
//         <Loading loading={loading} color={COLORS.primary} size={40} />
//       </View>
//     );

//   return (
// <SafeAreaView style={styles.container}>
//   <View style={styles.profileInfo}>
//     <Text style={styles.name}>{name}</Text>
//     {renderContact()}
//     {renderCards()}
//     {renderLogout()}
//   </View>
// </SafeAreaView>
//   );
// };

// export default ProfileInfo;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     padding: 20,
//   },
//   name: {
//     ...FONTS.h1,
//     color: COLORS.black1,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   contactWrapper: {
//     marginTop: SIZES.radius,
//   },
//   contactContainer: {
//     marginVertical: 5,
//   },
//   contactIconContainer: {
//     backgroundColor: COLORS.primary,
//     height: 33,
//     width: 33,
//     borderRadius: 12.5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   contact: {
//     fontFamily: FONTFAMIY.TTCommonsRegular,
//     fontSize: 18,
//     color: COLORS.gray,
//     marginLeft: SIZES.base,
//   },
//   cardWrapper: {
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flexWrap: 'wrap',
//   },
//   cardContainer: {
//     backgroundColor: COLORS.white,
//     height: 130,
//     width: '49%',
//     borderRadius: 15,
//     elevation: 5,
//     shadowColor: COLORS.primary,
//   },
//   cardIcon: {
//     height: 33,
//     width: 33,
//     alignSelf: 'center',
//     marginTop: 15,
//     tintColor: COLORS.gold,
//   },
//   cardContent: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardTitle: {
//     fontFamily: FONTFAMIY.TTCommonsMedium,
//     fontSize: 23,
//     color: COLORS.transparentBlack7,
//   },
//   cardDesc: {
//     fontFamily: FONTFAMIY.TTCommonsRegular,
//     fontSize: 15,
//     color: COLORS.gray,
//     textAlign: 'center',
//     lineHeight: 18,
//     marginTop: 5,
//   },
//   logoutBtnContainer: {
//     alignItems: 'center',
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, setUserId} from '../../redux/userSlice';
import {useNavigation} from '@react-navigation/native';
import {userHelper} from '../../utils';
import firestore from '@react-native-firebase/firestore';
import {COLORS, FONTFAMIY, FONTS, icons, SIZES} from '../../constants';
import {Button, Loading, VectorIcon} from '..';
const usersCollection = firestore().collection('users');

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userId = useSelector(state => state.user.userId);
  const userDetails = useSelector(state => state.user.userDetails);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);
    await userHelper.removeUserId();
    dispatch(setUserId(null));
    auth().signOut();
  };

  const navigateToOrders = () => {
    navigation.navigate('Orders');
  };

  const openGetHelp = async () => {
    try {
      await Linking.openURL(
        'https://tawk.to/chat/5f9401572915ea4ba09659cf/default',
      );
    } catch (error) {
      console.log('ERROR GETHELP ', error);
    }
  };

  function renderContact() {
    return (
      <View style={styles.contactWrapper}>
        <View style={{...styles.row, ...styles.contactContainer}}>
          <View style={styles.contactIconContainer}>
            <VectorIcon.Feather name="mail" size={20} color={COLORS.white} />
          </View>
          <Text style={styles.contact}>{userDetails?.email}</Text>
        </View>
        <View style={{...styles.row, ...styles.contactContainer}}>
          <View style={styles.contactIconContainer}>
            <VectorIcon.Feather name="phone" size={20} color={COLORS.white} />
          </View>
          <Text style={styles.contact}>{userDetails?.phoneNumber}</Text>
        </View>
      </View>
    );
  }

  function renderCards() {
    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity
          onPress={navigateToOrders}
          style={styles.cardContainer}>
          <Image source={icons.myOrders} style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>My Orders</Text>
            <Text style={styles.cardDesc}>Check Your Order Status</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGetHelp} style={styles.cardContainer}>
          <Image source={icons.getHelp} style={styles.cardIcon} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Get Help</Text>
            <Text style={styles.cardDesc}>We are available for you 24*7!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderLogout() {
    return (
      <View style={styles.logoutBtnContainer}>
        <Button
          onPress={logout}
          loading={logoutLoading}
          containerStyle={{
            height: 35,
            width: 150,
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderRadius: 0,
            borderColor: COLORS.primary,
            marginTop: 50,
          }}
          label="Logout"
          labelStyle={{
            color: COLORS.primary,
            fontFamily: FONTFAMIY.TTCommonsRegular,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loading loading={loading} color={COLORS.primary}>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{userDetails?.name}</Text>
          {renderContact()}
          {renderCards()}
          {renderLogout()}
        </View>
      </Loading>
    </SafeAreaView>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  name: {
    ...FONTS.h1,
    color: COLORS.black1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contactWrapper: {
    marginTop: SIZES.radius,
  },
  contactContainer: {
    marginVertical: 5,
  },
  contactIconContainer: {
    backgroundColor: COLORS.primary,
    height: 33,
    width: 33,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    fontFamily: FONTFAMIY.TTCommonsRegular,
    fontSize: 18,
    color: COLORS.gray,
    marginLeft: SIZES.base,
  },
  cardWrapper: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardContainer: {
    backgroundColor: COLORS.white,
    height: 130,
    width: '49%',
    borderRadius: 15,
    elevation: 5,
    shadowColor: COLORS.primary,
  },
  cardIcon: {
    height: 33,
    width: 33,
    alignSelf: 'center',
    marginTop: 15,
    tintColor: COLORS.gold,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: FONTFAMIY.TTCommonsMedium,
    fontSize: 23,
    color: COLORS.transparentBlack7,
  },
  cardDesc: {
    fontFamily: FONTFAMIY.TTCommonsRegular,
    fontSize: 15,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 5,
  },
  logoutBtnContainer: {
    alignItems: 'center',
  },
});
