import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'


export default function Inserir() {


  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [client, setClients] = useState("");
  const [genere, setGenere] = useState("");


  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  async function Cadastro() {
    await fetch('https://fakestoreapi.com/Clients', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({

        clientname: {
          firstname: nome,
          lastname: sobrenome
        },
        clientemail: email,

        clientgenere: genere,
      })
    })
      .then(res => (res.ok == true) ? res.json() : false)
      .then(json => {
        setSucesso((json.id) ? true : false)
        setErro((json.id) ? false : true)
      })
      .catch(err => setErro(true))
  }
  return (
    <ScrollView contentContainerStyle={css.container}>
      {sucesso ?
        <Text style={css.texto}>Obrigado por se cadastrar.Seu cadastro foi realizado com sucesso!</Text>
        :
        <>

          <TextInput placeholder='Nome' style={css.input} placeholderTextColor={"white"}></TextInput>
          <TextInput placeholder='Sobrenome' style={css.input} placeholderTextColor={"white"}></TextInput>
          <TextInput placeholder='Email' style={css.input} placeholderTextColor={"white"}></TextInput>
          <TextInput placeholder='Genero' style={css.input} placeholderTextColor={"white"}></TextInput>
          
          <TouchableOpacity style={css.btnCadastrar} onPress={Cadastro}>
            <Text style={css.btnCadastrarText}>CADASTRAR</Text>
          </TouchableOpacity>
          {erro && <Text style={css.texto}>Revise cuidadosamente os campos!</Text>}
        </>
      }
    </ScrollView>

  )
}

const css = StyleSheet.create({
  container: {

    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  texto: {
    color: "#FF66C4",
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 20

  },
  input: {
    width: "85%",
    height: 55,
    backgroundColor: "#FF66C4",
    borderRadius: 8,
    padding: 10,
    color: "white",
    marginTop: 35
  },
  btnCadastrar: {
    backgroundColor: "#FF66C4",
    width: "45%",
    height: 50,
    borderRadius: 8,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },
  btnCadastrarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17
  }
})