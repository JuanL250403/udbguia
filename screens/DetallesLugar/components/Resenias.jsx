import { useEffect, useState } from "react";
import { Text, TextInput, View, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export function Resenias({ route, navigation }) {
    const { lugar } = route.params
    const [resenias, setResenias] = useState(lugar.resenias)

    useEffect(()=> {
        actualizarResenias()
    },[resenias])

    const agregarResenia = () => {
        navigation.navigate("AgregarResenia", {lugar: lugar})
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
        <View style={{ height: "100%" }}>
            <View style={styles.nuevaResenia}>
                <TouchableOpacity style={styles.enviar} onPress={() => agregarResenia()}>
                    <Text style={styles.texto}>Agregar reseña</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {resenias.map((resenia, index) => (
                    <View style={styles.resenia} key={index}>
                        <Text>{resenia}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    nuevaResenia: {
        margin: 10,
        flexDirection: 'row',
        height: 40,
        justifyContent: "space-between",
        width: "full"
    },
    input: {
        padding: 10,
        backgroundColor: 'lightgrey', borderRadius: 20,
        width: "85%"
    },
    enviar: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "full",
        width: "100%",
        borderRadius: 20,
        backgroundColor: 'blue'
    },
    resenia: {
        borderWidth: 1,
        borderRadius: 20,
        height: 75,
        padding: 10,
        margin: 5
    },
    texto: {
        color: 'white'
    }
})