import { useEffect, useState } from "react"
import { Alert, View, Text } from "react-native"
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
        <View>
            <ScrollView>
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