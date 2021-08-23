import React from 'react'
import {View, StyleSheet} from 'react-native'
import Constants from 'expo-constants'
import {Video} from 'expo-av'

import HeaderModal from '../ContatosSOS/HeaderModal'

export default function VideoEducativo({navigation, route}) {
  const uri = route.params.url
  return(
    <View style={styles.container}>
      <HeaderModal
        titulo='VIDEO EDUCATIVO'
        acaoVoltar={() => navigation.goBack()}
      />
      <Video
        style={styles.video}
        source={{uri}}
        useNativeControls
        resizeMode='contain'
        isLooping
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  },
  video: {
    height: 200,
    width: 320,
    alignSelf: 'center'
  }
})