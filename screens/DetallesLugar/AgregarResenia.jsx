import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import { Resenias } from "./components/Resenias";
import { Inicio } from "../Inicio/Inicio";
import { colores } from "../../styles";

export function AgregarResenia({ route, navigation }) {
    const { lugar } = route.params
    const { actualizaResenia } = route.params
    const [mensaje, setMensaje] = useState("")

    const agregarResenia = async () => {
        if (mensaje === "" || mensaje == null) {
            return;
        }

        let lugares
        try {
            const lugaresItem = await AsyncStorage.getItem("lugares")
            lugares = JSON.parse(lugaresItem)

        } catch (error) {

        }
        lugares.forEach(l => {
            if (l.id == lugar.id) {
                l.resenias.push(mensaje);
            }
        });

        try {
            const lugaresString = JSON.stringify(lugares)
            AsyncStorage.setItem("lugares", lugaresString)
        } catch (error) {

        }
        setMensaje("")
    }
    return (
        <View style={styles.container}>

            <Text style={styles.nombre}>Escribe tu reseña de {lugar.nombre}</Text>

            <TextInput multiline={true} textAlignVertical="top" value={mensaje} style={styles.input} onChangeText={(texto) => setMensaje(texto)} />

            <View style={styles.acciones}>
                <TouchableOpacity style={styles.enviar} onPress={() => agregarResenia()}>
                    <Text style={styles.texto}>Enviar</Text>
                </TouchableOpacity>
                {/*BTN volever*/}
                <TouchableOpacity style={styles.enviar} onPress={() => navigation.goBack()}>
                    <Text style={styles.texto}>Regresar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
        height: "100%",
        backgroundColor: 'white',
    },
    input: {
        color: 'black',
        backgroundColor: colores.fondo,
        padding: 20,
        marginBottom: 20,
        textAlign: 'justify',
        marginTop: 20,
        height: "40%",
        borderRadius: 20,
        width: "100%",
        overflow: 'scroll'
    },
    enviar: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: "48%",
        borderRadius: 20,
        backgroundColor: '#2196F3',
    },
    nombre: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '900',
        marginBottom: 10,
        color: '#333'
    },
    acciones: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    texto: {
        color: 'white',
        fontSize: 18,
        lineHeight: 22,
    }
})