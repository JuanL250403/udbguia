import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Alert, StyleSheet } from "react-native";
import * as Location from 'expo-location';
import getDistance from "geolib/es/getPreciseDistance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LugarCercanoCard } from "./components/LugarCercanoCard";
import { useFocusEffect } from "@react-navigation/native";

export function LugaresCercanos({ navigation }) {
    const lugaresData = useRef([])
    const [lugaresCercanos, setLugaresCercanos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useFocusEffect(
        useCallback(() =>{
            obtenerLugares()
        },[])
    )

    useEffect(() => {
        let locacionSuscripcion;

        
        const iniciarSeguimiento = async () => {
            await obtenerLugares()
            // 1. Pedir permisos
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permisos GPS", "Se requieren permisos de GPS para medir distancias.");
                navigation.goBack()
                setCargando(false);
                return;
            }

            // 3. Suscribirse a la ubicación en tiempo real
            locacionSuscripcion = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 1
                },
                (nuevaLocacion) => {
                    const lu = lugaresData.current
                    const listaCalculada = lu.map(lugar => {
                        const metros = getDistance(
                            {
                                latitude: nuevaLocacion.coords.latitude,
                                longitude: nuevaLocacion.coords.longitude
                            },
                            {
                                latitude: lugar.coordenadas.latitud,
                                longitude: lugar.coordenadas.longitud
                            }
                        );

                        return {
                            ...lugar,
                            distancia: metros,
                            img: lugar.imgs && lugar.imgs.length > 0 ? lugar.imgs[0] : null,
                            // Aseguramos que las coordenadas estén al primer nivel para la Card
                            latitud: lugar.coordenadas.latitud,
                            longitud: lugar.coordenadas.longitud
                        };
                    });

                    // Ordenar de más cercano a más lejano
                    const ordenados = listaCalculada.sort((a, b) => a.distancia - b.distancia);
                    setLugaresCercanos(ordenados);
                    setCargando(false);
                }
            );
        };

        iniciarSeguimiento();

        // Limpiar suscripción al salir de la pantalla
        return () => {
            if (locacionSuscripcion) {
                locacionSuscripcion.remove();
            }
        };
    }, [lugaresData]);


    const obtenerLugares = async () => {
        const lugaresItem = await AsyncStorage.getItem("lugares");
        if (!lugaresItem) {
            setCargando(true);
            return;
        }
        const lugares = JSON.parse(lugaresItem);

        lugaresData.current = lugares
    }
    
    if (cargando) {
        return (
            <View style={styles.center}>
                <Text>Calculando lugares más cercanos...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Lugares cerca de ti</Text>
            {lugaresCercanos.length > 0 ? (
                lugaresCercanos.map((lugar, index) => (
                    <LugarCercanoCard
                        key={index}
                        lugar={lugar}
                        navigation={navigation}
                    />
                ))
            ) : (
                <Text style={styles.center}>No se encontraron datos.</Text>
            )}
            <View style={{ height: 20 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
        // Esto evita que el contenido del scroll se dibuje fuera del cuadro
        overflow: 'hidden',
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