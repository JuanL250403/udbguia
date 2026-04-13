import { Text, View } from "react-native";
export function Detalles({ route }) {
    const { lugar } = route.params;
    const { orientacion } = route.params;
    return (
        <View>

            <Text>{lugar.nombre}</Text>
            <Text>{lugar.tipo}</Text>
            <Text>{lugar.descripcion}</Text>
        </View>
    )
}