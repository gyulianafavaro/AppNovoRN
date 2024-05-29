import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, } from 'react-native';
import { AuthContext } from '../Context/AuthContext';


export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const { Login, error } = useContext(AuthContext);

    function realizalogin() {
        Login(email, senha);
    }




    return (
        <ScrollView contentContainerStyle={css.tudo}>
            <Image style={css.imagem} source={require('../../assets/Logotipo.png')}></Image>
            <View><Text style={css.texto}>Entre ou faça o cadastro</Text></View>
            <View style={css.caixa}>
                <TextInput style={css.input} placeholder="E-mail" value={email} onChangeText={(digitado) => setEmail(digitado)} />
                <TextInput style={css.input} placeholder="Senha" secureTextEntry={true} value={senha} onChangeText={(digitado) => setSenha(digitado)} />
                <TouchableOpacity style={css.btn} onPress={realizalogin}>
                    <Text style={css.btnText}>ENTRAR</Text>
                </TouchableOpacity>
            </View>
            {error &&
                <View style={css.error}>
                    <Text style={css.errorText}>Revise os campos. Tente novamente</Text>
                </View>
            }
        </ScrollView>
    )
}
const css = StyleSheet.create({
    input: {
        width: "83%",
        height: 40,
        marginBottom: 5,
        marginLeft: '8%',
        borderRadius: 6,
        padding: 8,
        marginTop: 25,
        borderWidth: 2,
        fontSize: 15,
        borderColor: '#DEDEDE',
        color: '#7C7C7C'
    },
    btn: {
        width: "83%",
        marginTop: 20,
        marginLeft: '8%',
        height: 45,
        backgroundColor: '#FF66C4',
        borderRadius: 5,
        color: 'white'
    },
    tudo: {
        backgroundColor: 'white',
        flexGrow: 1
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        lineHeight: 37,
        fontSize: 15,
        fontWeight: "bold"
    },
    caixa: {
        width: '80%',
        height: '28%',
        borderRadius: 7,
        marginLeft: '10%',
        marginTop: '5%',
        backgroundColor: '#F2F2F2'
    },
    imagem: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginLeft: '31%',
        marginTop: '25%'
    },
    texto: {
        marginLeft: '23%',
        marginTop: '20%',
        fontWeight: "bold",
        color: "#E04082",
        fontSize: 20
    },
    cadastro: {
        marginLeft: '22%'
    }
});
