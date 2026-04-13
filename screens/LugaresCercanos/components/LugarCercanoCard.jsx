import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
export function LugarCercanoCard({ lugar, navigation }) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("DetallesLugar", { lugar: lugar })}>
            <View>

                <Image src={lugar.img} style={styles.img} height={120} width={150} />
            </View>
            <View>
                <Text>{lugar.nombre}</Text>
                <Text>{lugar.tipo}</Text>
                <Text>{lugar.distancia}</Text>
                <Text>{lugar.descripcion}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 20,
        margin: 10,
        padding: 10
    },
    img: {
        borderRadius: 20,
        marginRight: 10,
        height: 20,
        width: 20
    }
})