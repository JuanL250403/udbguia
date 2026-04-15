import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, Linking, Alert } from "react-native";

export function LugarCercanoCard({ lugar, navigation }) {

    const abrirRuta = async () => {
        // URL corregida para navegación real en Google Maps
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lugar.latitud},${lugar.longitud}&travelmode=walking`;

        try {
            const soportado = await Linking.canOpenURL(url);
            if (soportado) {
                await Linking.openURL(url);
            } else {
                // Fallback al navegador si no detecta la app
                await Linking.openURL(url);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo abrir el mapa");
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("DetallesLugar", { lugar: lugar })}
        >
            <View style={styles.imageContainer}>

                {
                    lugar.imgs[0] ?
                        <Image
                            source={{ uri: lugar.imgs[0] }}
                            style={styles.img}
                        />
                        :
                        <Image
                            source={require("../../../assets/icons/noImagen.png")}
                            style={[styles.noImg]}
                        />
                }
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.nombre}>{lugar.nombre}</Text>
                <Text style={styles.tipo}>{lugar.tipo}</Text>
                <Text style={styles.distancia}> a {lugar.distancia} metros</Text>

                <View style={styles.buttonWrapper}>
                    <Button
                        title="¿CÓMO LLEGAR?"
                        color="#2196F3"
                        onPress={abrirRuta}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        borderWidth: 3,
        borderRadius: 20,
        marginVertical: 8,
        marginHorizontal: 10,
        padding: 10,
        borderColor: '#2FACE3r[p',
        backgroundColor: '#fff', // Fondo blanco para que resalte
        alignItems: 'center',
        overflow: 'hidden' // Corta cualquier exceso
    },
    img: {
        borderRadius: 15,
        marginRight: 15,
        height: 150, // Ajustado para que quepa bien en el cuadro
        width: 150,
        backgroundColor: '#eee'
    },
    noImg: {
        padding: 40,
        borderRadius: 15,
        marginRight: 15,
        height: 150, // Ajustado para que quepa bien en el cuadro
        width: 150,
        backgroundColor: '#eee'
    },
    imageContainer: { justifyContent: 'center' },
    infoContainer: { flex: 1, marginLeft: 10, justifyContent: 'center' },
    nombre: { fontWeight: 'bold', fontSize: 16, color: '#333' },
    tipo: { fontSize: 14, color: '#666' },
    distancia: { color: '#4CAF50', fontWeight: 'bold', marginTop: 4 },
    buttonWrapper: { marginTop: 8, borderRadius: 10, overflow: 'hidden' }
});