import React, {useEffect} from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'

import Constants from 'expo-constants'

import * as Speech from 'expo-speech'

import HeaderModal from '../ContatosSOS/HeaderModal'
import BotaoMenu from '../home/BotaoMenu'
import Texto from './Texto'

const texto1 = 'O rastreio é composto de várias perguntas sobre diferentes fatores de risco.'
const texto2 = 'Sempre que sua resposta apresentar um fator de risco receberá uma orientação em vídeo.'

export default function RastreioScreen({navigation, route}) {
  useEffect(() => {
    Speech.speak(texto1 + texto2)
  }, [])

  return (
    <View
      style={styles.container}
    >
      <HeaderModal
        titulo='RASTREIO'
        acaoVoltar={() => navigation.goBack()}
      />
      <View style={styles.conteudo}>
        <Texto 
          texto={texto1}
        />

        <Texto
          texto={texto2}
          backgroundColor='#1C9984'
        />
      </View>
      <View style={styles.acoes}>
        <BotaoMenu 
          titulo='CONTINUAR'
          acao={() => {
            Speech.stop()
            navigation.navigate('dicas')
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  conteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 30
  }, 
  acoes: {
    height: 90,
    paddingLeft: 15,
    paddingRight: 15
  }
})