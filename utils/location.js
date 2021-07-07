import AsyncStorage from '@react-native-async-storage/async-storage';

const getLocation = async () => {
  try {
    const response = await AsyncStorage.getItem('location');
    return response != null ? JSON.parse(response) : null;
  } catch (error) {
    console.log('ERROR GETLOCATION IN LOCATION JS ', error);
  }
};

export default {
  getLocation,
};
