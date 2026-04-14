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
                <Image 
                    source={lugar.img ? { uri: lugar.img } : { uri: 'https://via.placeholder.com/150' }} 
                    style={styles.img} 
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.nombre}>{lugar.nombre}</Text>
                <Text style={styles.tipo}>{lugar.tipo}</Text>
                <Text style={styles.distancia}>📍 a {lugar.distancia} metros</Text>
                
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
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 12,
        backgroundColor: '#fff',
        borderColor: '#eee',
        elevation: 3,
    },
    imageContainer: { justifyContent: 'center' },
    infoContainer: { flex: 1, marginLeft: 10, justifyContent: 'center' },
    nombre: { fontWeight: 'bold', fontSize: 16, color: '#333' },
    tipo: { fontSize: 14, color: '#666' },
    distancia: { color: '#4CAF50', fontWeight: 'bold', marginTop: 4 },
    img: { borderRadius: 15, height: 90, width: 90, backgroundColor: '#f0f0f0' },
    buttonWrapper: { marginTop: 8, borderRadius: 10, overflow: 'hidden' }
});