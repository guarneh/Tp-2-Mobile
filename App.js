import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button, Image } from 'react-native';
const axios = require('axios').default;

export default function App() {

  const [frases, setFrases] = React.useState([])
  const [img, setImg] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  function pegarAPI(){
    setLoading(true);
    axios.get("https://pokeapi.co/api/v2/pokemon/" + getRandomIntInclusive(1, 905))
      .then(function (response){
          setFrases(response.data.forms[0].name);
          setImg(response.data.sprites.front_default)
          setLoading(false);
      })
      .catch(function (err){
          console.log(err);
      })
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <View style={styles.container}>
      {!loading ? <Button 
        title="Obtener Pokemon Aleatorio"
        onPress={() => pegarAPI()}
        style={styles.boton}
      /> : <ActivityIndicator/>}
      
        <>
         <Text style={styles.palabra}>{frases}</Text>
         <Image
          style={styles.tinyLogo}
          source={{uri: img}}
        />
        </>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton: {
    color: 'red',
    margin: 20
  },
  tinyLogo: {
    width: 500,
    height: 500,
  },
  palabra: {
    paddingTop: 100,
    fontSize: 20,
  },


})
