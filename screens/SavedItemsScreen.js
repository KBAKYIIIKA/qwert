import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedItemsScreen = ({ navigation }) => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const loadSavedItems = async () => {
      const saved = await AsyncStorage.getItem('savedItems');
      const cart = await AsyncStorage.getItem('cartItems');

      // Если отложенные товары есть в AsyncStorage
      if (saved) {
        const savedItemsFromStorage = JSON.parse(saved);

        // Если корзина пустая, просто отображаем сохраненные товары
        if (cart) {
          const cartItems = JSON.parse(cart);

          // Фильтруем те товары, которые были удалены из корзины
          const filteredSavedItems = savedItemsFromStorage.filter(savedItem =>
            !cartItems.some(cartItem => cartItem.id === savedItem.id)
          );

          setSavedItems(filteredSavedItems);  // Обновляем состояние отложенных товаров
        } else {
          setSavedItems(savedItemsFromStorage);  // Если корзина пуста, просто показываем все сохраненные товары
        }
      }
    };

    loadSavedItems();
  }, []);

  const handleRemoveFromSaved = async (id) => {
    const updatedSavedItems = savedItems.filter(item => item.id !== id);
    setSavedItems(updatedSavedItems);

    // Обновляем отложенные товары в AsyncStorage
    await AsyncStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Отложенные товары</Text>
      <FlatList
        data={savedItems}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>Цена: {item.price} руб</Text>
            <Button title="Удалить" onPress={() => handleRemoveFromSaved(item.id)} />
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Button title="Очистить отложенные товары" onPress={async () => {
        await AsyncStorage.removeItem('savedItems');
        setSavedItems([]);  // Очищаем список отложенных товаров
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  productCard: { backgroundColor: '#fff', padding: 10, marginBottom: 15 },
  productImage: { width: '100%', height: 200 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productDescription: { fontSize: 14, color: '#555' },
  productPrice: { fontSize: 16, fontWeight: 'bold' },
});

export default SavedItemsScreen;
