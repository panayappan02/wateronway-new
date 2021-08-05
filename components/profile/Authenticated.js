// import React, {useState, useEffect} from 'react';
// import {StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import {Loading, ProfileInfo, UserDetailForm} from '..';
// import {COLORS} from '../../constants';
// import {nanoid} from 'nanoid';

// // redux
// import {useSelector, useDispatch} from 'react-redux';
// import {setUserId} from '../../redux/userSlice';
// import {userHelper} from '../../utils';

// // Collection
// const usersCollection = firestore().collection('users');

// const Authenticated = ({fromOtherComponent}) => {
//   const dispatch = useDispatch();
//   const {user} = useSelector(state => state.user);

//   const [loading, setLoading] = useState(true);
//   const [isUserDetailsAvailable, setIsUserDetailsAvailable] = useState(null);

//   useEffect(() => {
//     checkIsUserDetailsAvailable();
//   }, []);

//   const checkIsUserDetailsAvailable = async () => {
//     try {
//       usersCollection
//         .where('phoneNumber', '==', user.phoneNumber)
//         .onSnapshot(async snapshot => {
//           if (snapshot.docs.length) {
//             await userHelper.saveUserId(snapshot.docs[0].id);
//             dispatch(setUserId(snapshot.docs[0].id));

//             if (!fromOtherComponent) {
//               setIsUserDetailsAvailable(true);
//             }
//           } else {
//             setIsUserDetailsAvailable(false);
//             setLoading(false);
//           }
//         });
//     } catch (error) {
//       console.log(
//         'ERROR CHECKUSERDETAILSAVAILABLE IN AUTHENTICATED JS ',
//         error,
//       );
//     } finally {
//       if (!fromOtherComponent) {
//         setLoading(false);
//       }
//     }

//     // try {
//     //   const userSnapshot = await usersCollection
//     //     .where('phoneNumber', '==', user.phoneNumber)
//     //     .get();

//     //   if (userSnapshot.docs.length) {
//     //     // TODO:
//     //     await userHelper.saveUserId(userSnapshot.docs[0].id);
//     //     if (fromOtherComponent) {
//     //       setLoading(false);
//     //     }
//     //     dispatch(setUserId(userSnapshot.docs[0].id));
//     //     if (!fromOtherComponent) {
//     //       setIsUserDetailsAvailable(true);
//     //     }
//     //   } else {
//     //     setIsUserDetailsAvailable(false);
//     //     if (fromOtherComponent) {
//     //       setLoading(false);
//     //     }
//     //   }
//     // } catch (error) {
//     //   console.log(
//     //     'ERROR IN CHECKUSERDETAILSAVAILABLE IN AUTHENTICATED JS ',
//     //     error,
//     //   );
//     // } finally {
//     //   if (!fromOtherComponent) {
//     //     setLoading(false);
//     //   }
//     // }
//   };

//   const saveUserDetails = async (name, email) => {
//     let userId = nanoid(5);
//     const users = await usersCollection.get();
//     const existingUsersIdList = users.docs.map(doc => doc.id);
//     if (existingUsersIdList.includes(userId)) {
//       saveUserDetails(name, email);
//     } else {
//       try {
//         await usersCollection.doc(userId).set({
//           name,
//           email,
//           phoneNumber: user.phoneNumber,
//         });

//         setLoading(true);
//         checkIsUserDetailsAvailable();
//         await userHelper.saveUserId(userId);
//         dispatch(setUserId(userId));
//       } catch (error) {
//         console.log(error);
//         return {
//           status: 'error',
//           error,
//         };
//       }
//     }
//   };
//   // const saveUserDetails = async (name, email) => {
//   //   let userId = nanoid(5);
//   //   const users = await usersCollection.get();
//   //   const existingUsersIdList = users.docs.map(doc => doc.id);
//   //   if (existingUsersIdList.includes(userId)) {
//   //     saveUserDetails(name, email);
//   //   } else {
//   //     try {
//   //       await usersCollection.doc(userId).set({
//   //         name,
//   //         email,
//   //         phoneNumber: user.phoneNumber,
//   //       });

//   //       await userHelper.saveUserId(userId);
//   //       dispatch(setUserId(userId));

//   //       if (!fromOtherComponent) {
//   //         setLoading(true);
//   //         checkIsUserDetailsAvailable();
//   //       }
//   //     } catch (error) {
//   //       console.log(error);
//   //       return {
//   //         status: 'error',
//   //         error,
//   //       };
//   //     }
//   //   }
//   // };

//   if (loading)
//     return (
//       <View style={styles.container}>
//         <Loading loading={loading} color={COLORS.primary} size={40} />
//       </View>
//     );

//   if (!isUserDetailsAvailable)
//     return <UserDetailForm onSubmit={saveUserDetails} />;

//   return <ProfileInfo />;
// };

// export default Authenticated;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.white,
//   },
// });

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setUserId, setUserDetails} from '../../redux/userSlice';
import firestore from '@react-native-firebase/firestore';
import {Loading, ProfileInfo, UserDetailForm} from '..';
import {COLORS} from '../../constants';
import {nanoid} from 'nanoid';
import {userHelper} from '../../utils';
import {updateCustomer} from '../../helper/api';
const userCollection = firestore().collection('users');

const Authenticated = ({fromOtherComponent}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const userId = useSelector(state => state.user.userId);
  const [isUserDetailsAvailable, setIsUserDetailsAvailable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserDetailsAvailable();
  }, []);

  const checkUserDetailsAvailable = async () => {
    userCollection
      .where('phoneNumber', '==', user.phoneNumber)
      .onSnapshot(async snapshot => {
        if (snapshot.docs.length) {
          // TODO:
          await userHelper.saveUserId(snapshot.docs[0].id);
          dispatch(
            setUserDetails({
              name: snapshot.docs[0].data()?.name,
              email: snapshot.docs[0].data()?.email,
              phoneNumber: snapshot.docs[0].data()?.phoneNumber,
            }),
          );
          dispatch(setUserId(snapshot.docs[0].id));
          if (!fromOtherComponent) {
            setIsUserDetailsAvailable(true);
            setLoading(false);
          }
        } else {
          setLoading(false);
          setIsUserDetailsAvailable(false);
        }
      });
  };

  const saveUserDetails = async (name, email) => {
    try {
      // let userId = nanoid(5);
      // const users = await userCollection.get();
      // const usersIdsList = users.docs.map(doc => doc.id);
      // if (usersIdsList.includes(userId)) {
      //   saveUserDetails(name, email);
      // } else {
      //   setLoading(true);
      //   await userCollection.doc(userId).set({
      //     name,
      //     email,
      //     phoneNumber: user.phoneNumber,
      //   });
      // }

      const res = await updateCustomer(userId, name, email);

      if (res?.status === 'success') {
        await userCollection.doc(userId).set({
          name,
          email,
          phoneNumber: user.phoneNumber,
        });
      } else {
        setLoading(false);
        alert('Something went Wrong!');
        console.log('ERROR IN UPDATING CUSTOMER IN API ', res?.error);
      }
    } catch (error) {
      console.log('ERROR SAVEUSERDETAILS IN AUTHENTICATED JS ', error);

      return {
        status: 'error',
        error,
      };
    }
  };

  if (loading)
    return (
      <View style={{flex: 1}}>
        <Loading loading={loading} color={COLORS.primary} />
      </View>
    );

  if (isUserDetailsAvailable === false) {
    return <UserDetailForm onSubmit={saveUserDetails} />;
  } else {
    return <ProfileInfo />;
  }
};

export default Authenticated;

const styles = StyleSheet.create({});
