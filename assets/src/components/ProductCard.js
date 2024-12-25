import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProductCard = ({ product, onRemove, onQuantityChange }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={() => onQuantityChange(product.id, product.quantity - 1)} />
        <Text>{product.quantity}</Text>
        <Button title="+" onPress={() => onQuantityChange(product.id, product.quantity + 1)} />
      </View>
      <Button title="Remove" onPress={() => onRemove(product.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#2e8b57',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProductCard;
