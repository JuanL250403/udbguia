import { useEffect, useState } from "react"
import { Alert, View, Text , StyleSheet} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LugarCard } from "./components/LugarCard"
import { ScrollView } from "react-native-gesture-handler"

export function ListadoLugares({ navigation }) {
    const [lugares, setLugares] = useState([])

    useEffect(() => {
        obtenerLugares()
        console.log("montado")
    }, [])

    const obtenerLugares = async () => {
        try {
            const lugaresItems = await AsyncStorage.getItem("lugares");
            const lugares = JSON.parse(lugaresItems)
            setLugares(lugares);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <View style={styles.general}>
            {/* Agregamos style para que el ScrollView no ignore el contenedor */}
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
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
        backgroundColor: '#f9f9775c',
        padding: 20,
        // Esto evita que el contenido del scroll se dibuje fuera del cuadro
        overflow: 'hidden', 
    },
    scroll: {
        flex: 1,
        width: '100%',
    }
});