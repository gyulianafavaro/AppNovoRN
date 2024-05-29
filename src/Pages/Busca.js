import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator,TouchableOpacity,Alert  } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(false);
    const [edicao, setEdicao] = useState(false);
    const [userId, setUserId] = useState(0);
    const [userNome, setNome] = useState();
    const [userEmail, setEmail] = useState();
    const [userSenha, setSenha] = useState();
    const [deleteResposta, setResposta] = useState(false);

    async function getUsuarios() {
        await fetch('http://10.139.75.27:5251/api/Users/GetAllUsers', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => setUsuarios(json))
            .catch(err => setError(true))
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getUsuarios();
        }, [])
    )

    async function getUsuario(id) {
        await fetch('http://10.139.75.27:5251/api/Users/GetUserId/' + id, {
            method: 'GET',
            headers: {
                'Content-type': 'aplication/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(json => {
                setUserId(json.userId);
                setNome(json.userName);
                setEmail(json.userEmail);
                setSenha(json.userPassword);
            });
    }
    async function editUser() {
        await fetch('http://10.139.75.27:5251/api/Users/UpdateUser/' + userId, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                userId: userId,
                userEmail: userEmail,
                userSenha: userSenha,
                userName: userNome
            })
        })
            .then((response) => response.json())
            .catch(err => console.log(err));
        getUsuarios();
        setEdicao(false);
    }
    function showAlert(id, userName) {
        Alert.alert(
            '',
            'Deseja realmente excluir esse usuário ?',
            [
                { text: 'Sim', onPress: () => deleteUsuario(id, userName) },
                { text: 'Não', onPress: () => ('') },
            ],
            { cancelable: false }
        );
    }
    async function deleteUsuario(id, userName) {
        await fetch('http://10.139.75.27:5251/api/Users/DeleteUser/' + id, {
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
                'Usuário' + userName + ' excluindo com sucesso',
                [
                    { text: '', onPress: () => ('') },
                    { text: 'Ok', onPress: () => ('') },
                ],
                { cancelable: false }
            );
            getUsuarios();
        }
        else {
            Alert.alert(
                '',
                'Usuário' + userName + 'não foi excluído.',
                [
                    { text: '', onPress: () => ('') },
                    { text: 'Ok', onPress: () => ('') },
                ],
                { cancelable: false }
            );
            getUsuarios();
        }
    };
    return (
        <View style={css.container}>
            {edicao == false ?
                <FlatList
                    style={css.flat}
                    data={usuarios}
                    keyExtractor={(item) => item.userId}
                    renderItem={({ item }) => (
                        <View style={css.itemContainer}>
                            <Text style={css.text}>
                                {item.userName}
                            </Text>
                            <TouchableOpacity style={css.btnEdit} onPress={() => { setEdicao(true); getUsuario(item.userId) }}>
                                <Text style={css.btnText}>EDITAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={css.btnDelete} onPress={() => showAlert(item.userId, item.userName)}>
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