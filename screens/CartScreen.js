import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PromoCode from '../components/PromoCode';

const CartScreen = ({ navigation }) => {
  const productsData = [
    { id: '1', name: 'Морковь', description: 'Выращенная на бабкиной грядке', price: 20, image: require('../assets/carrot.png'), quantity: 1 },
    { id: '2', name: 'Шина', description: 'Шина для грузовиков', price: 2999, image: require('../assets/tire.jpg'), quantity: 1 },
    { id: '3', name: 'Видеокарта 4070', description: 'Видеокарта Nvidia 4070', price: 45000, image: require('../assets/gpu.jpg'), quantity: 1 },
  ];

  const [cartItems, setCartItems] = useState(productsData);
  const [savedItems, setSavedItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  // Функция для подсчета общей стоимости
  const calculateTotal = (cartItems, promoCode) => {
    let total = 0;
    cartItems.forEach(item => total += item.price * item.quantity);
    if (promoCode === 'DISCOUNT10') total *= 0.9;
    return total;
  };

  useEffect(() => {
    setTotalCost(calculateTotal(cartItems, promoCode));
  }, [cartItems, promoCode]);

  const handleApplyPromoCode = (code) => setPromoCode(code);

  // Функция для перемещения товара в отложенные
  const handleSaveItem = async (item) => {
    // Перемещаем товар в отложенные
    const updatedSavedItems = [...savedItems, item];

    // Сохраняем отложенные товары в AsyncStorage
    await AsyncStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));

    // Убираем товар из корзины
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCartItems);  // Обновляем состояние корзины

    // Обновляем корзину в AsyncStorage
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Обновляем список отложенных товаров
    setSavedItems(updatedSavedItems);
  };

  const handleRemoveItem = async (id) => {
    // Удаляем товар из корзины
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);

    // Обновляем корзину в AsyncStorage
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const updateItemQuantity = async (id, operation) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        if (operation === 'increase') {
          item.quantity += 1;
        } else if (operation === 'decrease' && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });

    setCartItems(updatedCartItems);

    // Обновляем корзину в AsyncStorage
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Пересчитываем общую стоимость
    setTotalCost(calculateTotal(updatedCartItems, promoCode));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Корзина</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>Цена: {item.price} руб</Text>
            <View style={styles.productActions}>
              <Button title="-" onPress={() => updateItemQuantity(item.id, 'decrease')} />
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Button title="+" onPress={() => updateItemQuantity(item.id, 'increase')} />
            </View>
            <View style={styles.productButtons}>
              <Button title="Отложить" onPress={() => handleSaveItem(item)} />
              <Button title="Удалить" onPress={() => handleRemoveItem(item.id)} />
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.total}>Total: {totalCost} руб</Text>
      <PromoCode onApplyPromo={handleApplyPromoCode} />
      <Button title="Перейти в отложенные товары" onPress={() => navigation.navigate('SavedItemsScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  productCard: { backgroundColor: '#fff', padding: 10, marginBottom: 15 },
  productImage: { width: '100%', height: 200 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productDescription: { fontSize: 14, color: '#555' },
  productPrice: { fontSize: 16, fontWeight: 'bold' },
  productActions: { flexDirection: 'row', alignItems: 'center' },
  quantity: { fontSize: 16, marginHorizontal: 15 },
  total: { fontSize: 20, fontWeight: 'bold', marginTop: 20 },
  productButtons: { flexDirection: 'row', marginTop: 10 },
});

export default CartScreen;
