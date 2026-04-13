import { useEffect, useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location'
import { getDistance } from "geolib";


export function MapaLugar({ route }) {
    const { height } = useWindowDimensions()

    const { lugar } = route.params
    const [permisos, setPermisos] = useState(true)
    const [distancia, setDistancia] = useState(0)
    const [ubicacionUsuario, setUbicacionUsuario] = useState({
        latitud: 0,
        longitud: 0
    })

    useEffect(() => {
        solicitarPermisos()
        locacionActual()
    }, [])

    const solicitarPermisos = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        Location.dist
        if (status !== "granted") {
            Alert.alert("Permisos GPS", "permisos de GPS requeridos")
            setPermisos(false)
        }
    }

    const locacionActual = async () => {
        solicitarPermisos()

        const locacionSubscripcion = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1
            },
            (nuevaLocacion) => {
                setDistancia(calculo)
                setUbicacionUsuario({
                    latitud: nuevaLocacion.coords.latitude ? nuevaLocacion.coords.latitude : 0,
                    longitud: nuevaLocacion.coords.longitude ? nuevaLocacion.coords.longitude : 0
                })
                const calculo = getDistance(
                    { latitude: ubicacionUsuario.latitud, longitude: ubicacionUsuario.longitud },
                    { latitude: nuevaLocacion.coords.latitude, longitude: nuevaLocacion.coords.longitude }
                )

            }
        )

        return () => locacionSubscripcion.remove()
    }


    if (!permisos) {
        return (
            <View>
                <Text>Pemisos necesarios</Text>
            </View>
        )
    }

    return (
        <View>
            <MapView
                style={{ height: "100%" }}
                showsUserLocation={true}
                followsUserLocation={true}
                region={{
                    latitude: ubicacionUsuario.latitud,
                    longitude: ubicacionUsuario.longitud,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002
                }}
            >
                <Marker coordinate={{ latitude: lugar.coordenadas.latitud, longitude: lugar.coordenadas.longitud }} />
            </MapView>
        </View>
    )
}