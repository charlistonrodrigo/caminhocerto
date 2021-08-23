import React, {useEffect, useState} from 'react'
import {View, Image, Text, StyleSheet, Alert} from 'react-native'
import Contants from 'expo-constants'

import * as Speech from 'expo-speech'

import BotaoMenu from '../home/BotaoMenu'
import HeaderModal from '../ContatosSOS/HeaderModal'

//import {getDica, getAllDicas} from './DicasAPI'
import * as DicasAPI from './DicasAPI'

export default function DicasScreen({navigation, route}) {
  const [indice, setIndice] = useState(1)
  const [dica, setDica] = useState({})
  
  useEffect(() => {
    console.log('useEffect ' + indice)
    carregarDicaAtual()
  }, [indice]) 

  async function carregarDicaAtual() {
    console.log('carregarDicas')
    const dica = await DicasAPI.getDica(indice)
    
    if(dica) {
      setDica(dica)
       Speech.speak(dica.textoDica)
    } else {
      const mensagem = 'Não temos mais dicas para hoje. Deseja retornar para a tela inicial?'
      Alert.alert(
        'Dicas',
        mensagem,
        [
          {text: "Não", style: "cancel"},
          {text: "Sim", onPress: () => navigation.popToTop()}
        ]
      )

      Speech.speak(mensagem)
    }
  }
 
  return (
    <View
      style={styles.screen}
    >
      <HeaderModal 
        titulo={`DICA ${indice}`}
        acaoVoltar={() => navigation.goBack()}
      />
      <View style={styles.container}>
        
        <Image source={{uri: dica.imagemDica}} style={styles.imagem} />
        <Text>{dica.textoDica}</Text>
        <View style={styles.botoes}>
          <BotaoMenu 
            titulo='Sim'
            style={styles.botao}
            acao={async () => {
              setIndice(indice + 1)
            }}
          />
          <BotaoMenu
            titulo='Não'
            style={styles.botao}
            acao={() => navigation.navigate('videoEducativo', {url: dica.videoOpcaoNao})}
          />
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Contants.statusBarHeight,
    flex: 1,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    padding: 10
  },
  imagem : {
    width: 300,
    height: 250,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10
  },
  botao: {
    width: '47%'
  }
})