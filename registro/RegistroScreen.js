import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Constants from 'expo-constants'

import QRCode from 'react-native-qrcode-svg'

export default function RegistroScreen(){
  const dadosPessoais = {
    nome: 'Charliston',
    tipoSang: 'A+',
    med: [
      'Med A',
      'Med B',
      'Med C',
    ]
  }

  return (
    <View style={styles.container}>
      <QRCode 
        value={JSON.stringify(dadosPessoais)} 
        size={200}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center"
  }
})