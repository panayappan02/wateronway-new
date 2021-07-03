import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUserId = async userId => {
  try {
    await AsyncStorage.setItem('userId', userId);
  } catch (error) {
    console.log('ERROR SAVEUSERID ', error);
  }
};

const getUserId = async () => {
  try {
    const res = await AsyncStorage.getItem('userId');
    return res != null ? res : null;
  } catch (error) {
    console.log('ERROR GETUSERID ', error);
  }
};

const removeUserId = async () => {
  try {
    await AsyncStorage.removeItem('userId');
  } catch (error) {
    console.log('ERROR REMOVEUSERID ', error);
  }
};

export default {
  saveUserId,
  getUserId,
  removeUserId,
};
