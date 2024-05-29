import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator,TouchableOpacity,Alert  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(false);
    const [edicao, setEdicao] = useState(false);
    const [clientId, setClientId] = useState(0);
    const [clientNome, setNome] = useState();
    const [clientEmail, setEmail] = useState();
    const [clientGenere, setGenere] = useState();
    const [deleteResposta, setResposta] = useState(false);

    async function getClients() {
        await fetch('http://10.139.75.27:5251/api/Users/GetAllClients', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => setClientes(json))
            .catch(err => setError(true))
    }

    useEffect(() => {
        getClients();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getClients();
        }, [])
    )

    async function getClients(id) {
        await fetch('http://10.139.75.27:5251/api/Users/GetClientId/' + id, {
            method: 'GET',
            headers: {
                'Content-type': 'aplication/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(json => {
                setClientId(json.clientId);
                setNome(json.clientName);
                setEmail(json.clientEmail);
                setGenere(json.clientGenere);
            });
    }
    async function editClient() {
        await fetch('http://10.139.75.27:5251/api/Users/UpdateClients/' + clientId, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                clientId: clientId,
                clientName: clientNome,
                clientEmail: clientEmail,
                clientGenere: clientGenere
                
            })
        })
            .then((response) => response.json())
            .catch(err => console.log(err));
        getClients();
        setEdicao(false);
    }
    function showAlert(id, clientName) {
        Alert.alert(
            '',
            'Deseja realmente excluir esse usuário ?',
            [
                { text: 'Sim', onPress: () => deleteClient(id, clientName) },
                { text: 'Não', onPress: () => ('') },
            ],
            { cancelable: false }
        );
    }
    async function deleteClient(id, clientName) {
        await fetch('http://10.139.75.27:5251/api/Users/DeleteClients/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(json => setResposta(json))
            .catch(err => setError(true))

        if (deleteResposta == true) {
            Alert.alert(
                '',
                'Usuário' + clientName + ' excluindo com sucesso',
                [
                    { text: '', onPress: () => ('') },
                    { text: 'Ok', onPress: () => ('') },
                ],
                { cancelable: false }
            );
            getClients();
        }
        else {
            Alert.alert(
                '',
                'Usuário' + clientName + 'não foi excluído.',
                [
                    { text: '', onPress: () => ('') },
                    { text: 'Ok', onPress: () => ('') },
                ],
                { cancelable: false }
            );
            getClients();
        }
    };
    return (
        <View style={css.container}>
            {edicao == false ?
                <FlatList
                    style={css.flat}
                    data={clientes}
                    keyExtractor={(item) => item.clientId}
                    renderItem={({ item }) => (
                        <View style={css.itemContainer}>
                            <Text style={css.text}>
                                {item.clientName}
                            </Text>
                            <TouchableOpacity style={css.btnEdit} onPress={() => { setEdicao(true); getUsuario(item.clientId) }}>
                                <Text style={css.btnText}>EDITAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={css.btnDelete} onPress={() => showAlert(item.clientId, item.clientName)}>
                                <Text style={css.btnText}>EXCLUIR</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                :
                <View style={css.editar}>
                    <TextInput
                        inputMode="text"
                        style={css.input}
                        value={userNome}
                        onChangeText={(digitado) => setNome(digitado)}
                        placeholder="white"
                    />
                    <TextInput
                        inputMode="email"
                        style={css.input}
                        value={userEmail}
                        onChangeText={(digitado) => setEmail(digitado)}
                        placeholder="white"
                    />
                    <TextInput
                        inputMode="text"
                        secureTextEntry={true}
                        style={css.input}
                        value={userSenha}
                        onChangeText={(digitado) => setSenha(digitado)}
                        placeholder="white"
                    />
                    <TouchableOpacity style={css.btnCreate} onPress={() => editUser()}>
                        <Text style={css.btnLoginText}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        width: "90%",
        padding: 20,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 20,
        elevation: 10,
        marginTop: 50
    },
    flat: {
        // Estilos da FlatList, se necessário
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    text: {
        // Estilos para o texto do item, se necessário
    },
    btnEdit: {
        backgroundColor: '#FAA3D9',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btnDelete: {
        backgroundColor: '#FF66C4',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
});