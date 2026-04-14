import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import getDistance from "geolib/es/getPreciseDistance";

export function MapaLugar({ route }) {
    const { lugar } = route.params;
    const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
    const [distancia, setDistancia] = useState(0);

    useEffect(() => {
        let suscripcion;

        const iniciarSeguimiento = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Error", "Se necesitan permisos de GPS.");
                return;
            }

            // Obtenemos la primera ubicación para centrar el mapa
            let inicial = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            setUbicacionUsuario({
                latitude: inicial.coords.latitude,
                longitude: inicial.coords.longitude
            });

            // Vigilamos el movimiento
            suscripcion = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 2000,
                    distanceInterval: 1
                },
                (loc) => {
                    const nuevasCoords = {
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude
                    };
                    setUbicacionUsuario(nuevasCoords);
                    
                    const d = getDistance(
                        nuevasCoords,
                        { latitude: lugar.coordenadas.latitud, longitude: lugar.coordenadas.longitud }
                    );
                    setDistancia(d);
                }
            );
        };

        iniciarSeguimiento();
        return () => suscripcion?.remove();
    }, []);

    if (!ubicacionUsuario) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2196F3" />
                <Text>Obteniendo ubicación real...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                initialRegion={{
                    latitude: ubicacionUsuario.latitude,
                    longitude: ubicacionUsuario.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                <Marker 
                    coordinate={{ 
                        latitude: lugar.coordenadas.latitud, 
                        longitude: lugar.coordenadas.longitud 
                    }} 
                    title={lugar.nombre}
                />
            </MapView>
            <View style={styles.info}>
                <Text style={{fontWeight: 'bold'}}>Distancia: {distancia} metros</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: '100%', height: '100%' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    info: { position: 'absolute', bottom: 20, backgroundColor: 'white', padding: 10, alignSelf: 'center', borderRadius: 10, elevation: 5 }
});