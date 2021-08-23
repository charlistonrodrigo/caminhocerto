import React from 'react'

import {View, Text, Image, StyleSheet} from 'react-native'

import logo from '../assets/logo.png'

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.titulo}>
        <Text style={styles.caminho}>Caminho </Text>
        <Text style={[styles.caminho, styles.certo]}>Certo</Text>
      </View>
      <Image source={logo} style={styles.imagem} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    padding: 10,
     borderColor: 'black',
    borderWidth: 1,
  },
  titulo: {
    flexDirection: "row",
    marginBottom: 10
  },
  caminho: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Roboto"
  },
  certo: {
    color: "#5CC4B6"
  },
  imagem: {
    backgroundColor: '#CCFFFF',
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    width: 100,
    height: 100 
  },
})