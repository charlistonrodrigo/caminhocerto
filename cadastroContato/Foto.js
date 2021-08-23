import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native'

import {Camera} from 'expo-camera'

import { Ionicons } from '@expo/vector-icons';


export default function Foto({takePicture}) {
  const [hasPermission, setHasPermission] = useState(null)
  const [tipo, setTipo] = useState(Camera.Constants.Type.front)

  useEffect(() => {
    obterPermissaoCamera()
  }, [])

  const obterPermissaoCamera = async () => {
    const{status} = await Camera.requestPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  if(hasPermission === null)
    return <ActivityIndicator size="large" />

  if(hasPermission === false)
    return <Text>É necessário a permissão para acessar a camera </Text>

  const reverterCamera = () => {
    setTipo(
      tipo === Camera.Constants.Type.front 
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front
    )
  }

  const tirarFoto = async () => {
    if(this.camera) {
      const data = await this.camera.takePictureAsync({quality: 0.1, base64: true})
     
      takePicture && takePicture('data:image/jpg;base64,' + data.base64)
    }
  }

  return (
    <>
      <Camera
        type={tipo}
        style={styles.camera}
        ref={(ref) => this.camera = ref}
      >
        <View style={styles.viewCamera}>
          <TouchableOpacity onPress={tirarFoto}>
            <Ionicons name="camera" size={60} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={reverterCamera} >
            <Ionicons name="ios-camera-reverse" size={60} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </>

  )
}


const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: 450
  },
  viewCamera : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end'
  } 
})