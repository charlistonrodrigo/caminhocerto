import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default function Texto({texto, backgroundColor='#0D5145'}) {
  return (
    <Text style={[styles.container, {backgroundColor}]}>
      {texto}
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 21,
    padding: 30,
    textAlign: 'center',
    borderRadius: 30
  }
})