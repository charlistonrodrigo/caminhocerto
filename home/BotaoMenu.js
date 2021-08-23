import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export default function BotaoMenu({titulo, acao, cor='#24CBAF', style={}}) {
  return (
    <TouchableOpacity
      style={[styles.botao, {backgroundColor: cor}, style]}
      onPress={acao}
    >
      <Text style={styles.texto}>{titulo.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  botao: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 3
  }, 
  texto: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 32,
    color: 'white'
  }
})