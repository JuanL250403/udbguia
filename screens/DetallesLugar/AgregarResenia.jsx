import { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";
import { Resenias } from "./components/Resenias";
import { Inicio } from "../Inicio/Inicio";

export function AgregarResenia({ route, navigation }) {
    const { lugar } = route.params
    const { actualizaResenia } = route.params
    const [mensaje, setMensaje] = useState
        ("")

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
        <View>
            <Text>{lugar.nombre}</Text>
            <TextInput value={mensaje} onChangeText={(texto) => setMensaje(texto)} />
            <TouchableOpacity style={styles.enviar} onPress={() => agregarResenia()}>
                <Text>Registrar</Text>
            </TouchableOpacity>
            {/*BTN volever*/}
            <TouchableOpacity style={styles.enviar} onPress={() => navigation.goBack()}>
                <Text>Volver Atras</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        backgroundColor: 'lightgrey', borderRadius: 20,
        width: "85%"
    },
    enviar: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: "100%",
        borderRadius: 20,
        backgroundColor: 'blue',
        marginBottom: 30,
    },

})