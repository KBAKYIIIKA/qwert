import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadCart = async () => {
  const cart = await AsyncStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = async (cartItems) => {
  await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
};
