import React from 'react'
import {View, Text, StyleSheet, Button, Image} from 'react-native'

import Constants from 'expo-constants'

import Header from './Header'
import BotaoMenu from './BotaoMenu'

export default function HomeScreen({navigation, route}) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.opcoes}>
        <BotaoMenu 
          cor="red"
          titulo="SOS"
          acao={() => navigation.navigate('ListaContatos')}
        />

        <BotaoMenu 
          titulo="Registro"
          acao={() => navigation.navigate('registro')}
        />

        <BotaoMenu 
          titulo="Rastreio"
          acao={() => navigation.navigate('rastreio')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  },
  opcoes: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20
  },
})