import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';

export default function HeaderModal({titulo, acaoVoltar}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={acaoVoltar}
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.titulo}>{titulo}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: '#24CBAF',
    alignItems: "center"
  },
  titulo: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'white',
    flexGrow: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

