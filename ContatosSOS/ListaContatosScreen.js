import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Alert} from 'react-native'
import Constants from 'expo-constants'

import AsyncStorage from '@react-native-async-storage/async-storage';

import CardContato from './CardContato'
import HeaderModal from './HeaderModal'
import FloatButton from './FloatButton'
import foto from '../assets/filha.png'

/*
const listaContatos = [
  {nome: 'LARISSA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'KAMILA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'ANA LUISA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'NATÁLIA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'LARISSA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'KAMILA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'ANA LUISA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'NATÁLIA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'LARISSA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'KAMILA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'ANA LUISA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'NATÁLIA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'LARISSA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'KAMILA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'ANA LUISA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  {nome: 'NATÁLIA', telefone: '(31) 98888-0099', parentesco: 'FILHA'},
  
]
*/

export default function ListaContatosScreen({navigation, route}) {

  const [listaContatos, setListaContatos] = useState([])

  useEffect(() => {
    console.log('useEffect', new Date())
    carregarContatos()
  }, [])

  async function carregarContatos() {
    const valores = await AsyncStorage
                            .getItem('@contatos')
                            .then(JSON.parse) || []

    setListaContatos(valores)
    
  }

  const obterImagemAvatar = (imagemBase64) => (
    <Image
       source={imagemBase64 ? {uri: imagemBase64} : foto}
       style={styles.foto}
    />   
  )

  const onDelete = (item) => {
     Alert.alert(
      'Remover contato',
      `Deseja remover o contato ${item.nome}`,
      [
        {text: "Não", style: "cancel"},
        {text: "Sim", onPress: async () => {
          const novaListaContatos = listaContatos.filter(c => c.nome !== item.nome)
          await AsyncStorage.setItem('@contatos', JSON.stringify(novaListaContatos))

          setListaContatos(novaListaContatos)
          alert('Contato removido com sucesso')
        }}
      ]
    )
  }

  return (
    <View style={styles.container}>
      <HeaderModal 
        titulo="CONTATOS SOS"
        acaoVoltar={() => navigation.goBack()}
      />

      <FlatList
        data={listaContatos}
        renderItem={
          ({item}) => 
              <TouchableOpacity
                onPress={() => navigation.navigate('ligar', {contato: item})}
              >
                <CardContato
                  parentesco={item.tipo}
                  nome={item.nome}
                  telefone={item.telefone}
                  foto={obterImagemAvatar(item.imagemBase64)}
                   onDelete={() => onDelete(item)}
                />
              </TouchableOpacity>
        } 
        
      />
     
      <FloatButton 
        acao={() => navigation.navigate('cadastroContato' ,{setListaContatos})}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center'
  },
  foto: {
    width: 70,
    height: 90,
    borderRadius: 14,
    elevation: 10,
  }
}) 
