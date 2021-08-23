import React, {useState} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {TextInput, Button, Avatar} from 'react-native-paper'
import {Picker} from '@react-native-picker/picker';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

import Constants from 'expo-constants'

import HeaderModal from '../ContatosSOS/HeaderModal'
import Foto from './Foto'

export default function CadastroContatoScreen({navigation, route}) {
  const [tipo, setTipo] = useState('FILHO(A)')
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [imagemBase64, setImagemBase64] = useState()
  const {getItem, setItem} = useAsyncStorage('@contatos')
  
  const actionSalvar = async () => {
     
    const listaContatos = await getItem().then(JSON.parse) || []

    listaContatos.push({nome, telefone, tipo, imagemBase64 })
    
    await setItem(JSON.stringify(listaContatos))

    console.log('Lista de contatos', JSON.stringify(listaContatos))

    alert('Contato registrado com sucesso')
    route.params.setListaContatos(listaContatos)

    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <HeaderModal 
        titulo="CADASTRO DE CONTATO SOS"
        acaoVoltar={() => navigation.goBack()}
      />
      <View style={styles.inputs}>
         {
          imagemBase64 
            ? <Avatar.Image size={124} source={{uri: imagemBase64}} style={styles.avatar}/>
            : <Foto 
                takePicture={(base64) => setImagemBase64(base64)}
              />
        }
       
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
          style={styles.parentesco}
        > 
          <Picker.Item label="FILHO(A)" value="FILHO(A)"/> 
          <Picker.Item label="IRMÃO" value="IRMÃO"/> 
          <Picker.Item label="PAI" value="PAI"/> 
          <Picker.Item label="MÃE" value="MÃE"/>
          <Picker.Item label="TIO(A)" value="TIO(A)"/>
          <Picker.Item label="OUTROS" value=""/> 
        </Picker>
        
        <TextInput
          placeholder='Nome'
          mode='outlined'
          label='INFORME O NOME'
          onChangeText={(text) => setNome(text)}
          style={styles.input}
        />

        <TextInput
          placeholder='(31) 99999-9999'
          mode='outlined'
          label='INFORME O TELEFONE'
          keyboardType='phone-pad'
          style={styles.input}
          value={telefone}
          onChangeText={(text) =>  setTelefone(text)}
        />

        <Button icon="camera" mode="outlined" onPress={actionSalvar}>
          SALVAR CONTATO
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  inputs: {
    flex: 1,
    padding: 20,
  },
  parentesco: {
    width: 300,
    height: 50,
    marginBottom: 30
  },
  input: {
    marginBottom: 30
  },
  avatar: {
    alignSelf: 'center'
  }
})