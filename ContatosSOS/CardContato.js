import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

import { AntDesign } from '@expo/vector-icons';

export default function CardContato({foto, parentesco, nome, telefone, onDelete}) {
  return(
    <View style={styles.container}>
      {foto}
      <View style={styles.dados}>
        <Text style={styles.texto}>{parentesco}</Text>
        <Text style={[styles.texto, styles.textoEmDestaque]}>{nome}</Text>
        <Text style={styles.texto}>{telefone}</Text>
      </View>
      <View>
         <TouchableOpacity onPress={onDelete}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }, 
  dados: {
    flexGrow: 1,
    padding: 10
  }, 
  texto: {
    fontFamily: 'Roboto',
    fontSize: 14
  },
  textoEmDestaque: {
    fontWeight: 'bold'
  }
})