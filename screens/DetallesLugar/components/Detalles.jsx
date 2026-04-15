import { Text, View, StyleSheet, ScrollView } from "react-native";
import { colores } from "../../../styles";

export function Detalles({ route }) {
    const { lugar } = route.params;
    const { orientacion } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.nombre}>{lugar.nombre}</Text>
                <Text style={styles.tipo}>{lugar.tipo}</Text>
                <Text style={styles.descripcion}>{lugar.descripcion}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    card: {
        padding: 20,
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        height: "90%"
    },
    nombre: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '900',
        marginBottom: 10,
        color: '#333'
    },
    tipo: {
        textAlign: 'center',
        fontSize: 16,
        color: colores.primario,
        marginBottom: 15,
        fontWeight: '600'
    },
    descripcion: {
        backgroundColor: '#eee',
        borderRadius : 5,
        padding: 20,
        fontSize: 16,
        lineHeight: 22,
        color: '#555',
        textAlign: 'justify'
    }
});