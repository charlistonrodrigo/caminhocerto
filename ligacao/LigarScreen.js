import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Linking} from 'react-native'

import Constantes from 'expo-constants'
import MapView, {Marker} from 'react-native-maps'
import * as Location from 'expo-location'

import HeaderModal from '../ContatosSOS/HeaderModal'
import BotaoMenu from '../home/BotaoMenu'

export default function LigarScreen({navigation, route}) {
  const {contato} = route.params
  const [localizacao, setLocalizacao] = useState()

  useEffect(() => {
    obterLocalizacao()
  }, [])

  const obterLocalizacao = async () => {
    const {status} = await Location.requestPermissionsAsync()

    if(status !== 'granted') {
      alert('Você precisa habilitar o serviço de localização do seu celular')
    } else {
      const loc = await Location.getCurrentPositionAsync()
      
      setLocalizacao({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      })
    }
  }

  const enviarLocalizacao = async () => {
    const {status} = await Location.requestPermissionsAsync()

    if(status !== 'granted') {
      alert('Você precisa habilitar o serviço de localização do seu celular')
    } else {
      const loc = await Location.getCurrentPositionAsync()

      const mensagem = `${contato.nome} preciso da sua ajuda URGENTE. Estou neste lugar.
      https://www.google.com.br/maps/@${loc.coords.latitude},${loc.coords.longitude},18z`

      Linking.openURL(`whatsapp://send?text=${mensagem}&phone=+55${contato.telefone}`)
    }
  }

  return (
    <View style={styles.container}>
      <HeaderModal 
        titulo={`${contato.tipo} ${contato.nome}`}
        acaoVoltar={() => navigation.goBack()}
      />  
        <View style={styles.mapa}>
           <MapView 
              initialRegion={localizacao}
              style={styles.mapView}
              
           >
           {/* mapType='satellite'*/}

           {localizacao &&
              <Marker 
                coordinate={localizacao}
                title='Você está aqui'
                description='Esté é o lugar onde você está'
              >
                <View style={styles.circulo1}>
                  <View style={styles.circulo2}/>
                </View>
              </Marker>
           }  
        </MapView>
      </View>
      <View style={styles.acoes}>
        <BotaoMenu
          titulo={`Ligar p/ ${contato.nome}`}
          acao={() => Linking.openURL(`tel:${contato.telefone}`)}
        />

        <BotaoMenu
          titulo='Enviar localização'
          acao={enviarLocalizacao}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constantes.statusBarHeight,
  },
  mapa: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  mapView: {
    height: '100%',
    width: '100%'
  },
  acoes: {
    flexBasis: 170,
    justifyContent: 'space-around',
    padding: 5
  },
  circulo1: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 112, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circulo2: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF' 
  }
})
