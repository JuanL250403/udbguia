import { Text, View, StyleSheet, ScrollView } from "react-native";

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
        backgroundColor: '#f9f9775c',
    },
    card: {
        margin: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        borderWidth: 1,
        borderRadius: 20,
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    nombre: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333'
    },
    tipo: {
        fontSize: 16,
        color: '#2196F3',
        marginBottom: 15,
        fontWeight: '600'
    },
    descripcion: {
        fontSize: 16,
        lineHeight: 22,
        color: '#555',
        textAlign: 'justify'
    }
});