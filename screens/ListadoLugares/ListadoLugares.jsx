import { useCallback, useEffect, useState } from "react"
import { Alert, View, Text, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LugarCard } from "./components/LugarCard"
import { ScrollView } from "react-native-gesture-handler"
import { useFocusEffect } from "@react-navigation/native"

export function ListadoLugares({ navigation }) {
    const [lugares, setLugares] = useState([])
    const [cargando, setCargando] = useState(true)
    
    useFocusEffect(
        useCallback(() => {
            obtenerLugares()
        }, [])
    )

    useEffect(() => {

        obtenerLugares()

    }, [])

    const obtenerLugares = async () => {
        try {
            const lugaresItems = await AsyncStorage.getItem("lugares");
            const lugares = JSON.parse(lugaresItems)
            setLugares(lugares);
            setCargando(false)
        } catch (e) {
            setCargando(true)
        }
    }

    if (cargando) {
        return (
            <View style={styles.center}>
                <Text>Cargando lugares</Text>
            </View>
        )
    }


    return (
        <View style={styles.general}>
            {/* Agregamos style para que el ScrollView no ignore el contenedor */}
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Lugares</Text>
                {lugares.map((lugar, index) => (
                    <LugarCard
                        key={index}
                        lugar={lugar}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    general: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scroll: {
        flex: 1,
        padding: 20
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 15,
        color: '#333'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    }
});