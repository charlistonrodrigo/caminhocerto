import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions' 

import HomeScreen from './home/HomeScreen'
import ListaContatosScreen from './ContatosSOS/ListaContatosScreen'
import LigarScreen from './ligacao/LigarScreen'
import CadastroContatoScreen from './cadastroContato/CadastroContatoScreen'
import RastreioScreen from './rastreio/RastreioScreen'
import DicasScreen from './dicas/DicasScreen'
import VideoEducativo from './dicas/VideoEducativo'
import RegistroScreen from './registro/RegistroScreen'

const Stack = createStackNavigator()

export default function App() {
 
  useEffect(() => {
    registrarPushNotification()
  }, [])

  const registrarPushNotification = async () => {
    let {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS)

    if(status !== 'granted')
      status = await Permissions.askAsync(Permissions.NOTIFICATIONS)

    if(status !== 'granted') {
      alert('É necessário a permissão de notificação para receber os nossos comunicados!')
    } else {
      const expoData = await Notifications.getExpoPushTokenAsync()
      const token = expoData.data
      console.log('Token gerado pela Expo para as Notificações: ', token)     
    }
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ListaContatos" component={ListaContatosScreen}/>
        <Stack.Screen name="ligar" component={LigarScreen} />
        <Stack.Screen name="cadastroContato" component={CadastroContatoScreen} />
        <Stack.Screen name='rastreio' component={RastreioScreen} />
        <Stack.Screen name='dicas' component={DicasScreen} />
        <Stack.Screen name='videoEducativo' component={VideoEducativo} />
        <Stack.Screen name='registro' component={RegistroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}