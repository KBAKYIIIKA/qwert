import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const PromoCode = ({ onApplyPromo }) => {
  const [code, setCode] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Enter promo code"
        style={styles.input}
      />
      <Button title="Apply" onPress={() => onApplyPromo(code)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
});

export default PromoCode;
