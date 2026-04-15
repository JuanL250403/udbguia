import { useEffect, useState } from "react";
import { Text, TextInput, View, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { colores } from "../../../styles";

export function Resenias({ route, navigation }) {
    const { lugar } = route.params
    const [resenias, setResenias] = useState(lugar.resenias)

    useEffect(() => {
        actualizarResenias()
    }, [resenias])

    const agregarResenia = () => {
        navigation.navigate("AgregarResenia", { lugar: lugar })
    }

    const actualizarResenias = async () => {

        try {
            const lugaresItem = await AsyncStorage.getItem("lugares");
            const lugares = JSON.parse(lugaresItem)

            lugares.forEach(l => {
                if (l.id == lugar.id) {
                    setResenias(l.resenias)
                }
            });

        } catch (error) {

        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.nuevaResenia}>
                <TouchableOpacity style={styles.enviar} onPress={() => agregarResenia()}>
                    <Text style={styles.texto}>Agregar reseña</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {resenias.map((resenia, index) => (
                    <View style={styles.resenia} key={index}>
                        <Image source={require('../../../assets/icons/usuario.png')} style={styles.usuario} />
                        <Text style={styles.comentario}>{resenia}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: 'white',
    },
    nuevaResenia: {
        margin: 10,
        flexDirection: 'row',
        height: 40,
        justifyContent: "space-between",
        width: "full"
    },
    enviar: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "full",
        width: "100%",
        borderRadius: 20,
        backgroundColor: '#2196F3'
    },
    usuario: {
        height: 35,
        width: 35,
        marginRight: 10,
        padding: 10,
        borderRadius: 999,
        backgroundColor: '#eee'
    },
    resenia: {
        flexDirection: 'row',
        padding: 10,
        margin: 2,
        padding: 10,
        alignItems: 'center',
        overflow: 'scroll'
    },
    comentario: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        fontSize: 15,
        textAlign: 'justify',
        backgroundColor: '#fff',
        height: 'auto',
        minWidth: '85%',
        maxWidth: '85%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
    },
    texto: {
        fontSize: 18,
        lineHeight: 22,
        color: 'white'
    }
})