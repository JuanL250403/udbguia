import { View, Text } from "react-native";
import * as Location from 'expo-location'
import getDistance from "geolib/es/getPreciseDistance";
import { orderByDistance } from "geolib";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LugarCercanoCard } from "./components/LugarCercanoCard";

export function LugaresCercanos({navigation}) {
    const [lugares, setLugares] = useState([])
    const [lugaresCercanos, setLugaresCercanos] = useState([])
    const [ubicacion, setUbicacion] = useState([])

    useEffect(() => {

        let locacionSuscripcion
        const suscripcion = async () => {
            solicitarPermisos()

            const lugaresItem = await AsyncStorage.getItem("lugares");
            const lugares = JSON.parse(lugaresItem)

            locacionSuscripcion = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 0.2
                },
                (nuevaLocacion) => {
                    let lugaresC = []

                    lugares.map(lugar => {
                        const distancia = getDistance(
                            { latitude: nuevaLocacion.coords.latitude, longitude: nuevaLocacion.coords.longitude },
                            { latitude: lugar.coordenadas.latitud, longitude: lugar.coordenadas.longitud }
                        )

                        const lugarCercano = {
                            id: lugar.id,
                            nombre: lugar.nombre,
                            tipo: lugar.tipo,
                            distancia: distancia,
                            img: lugar.imgs[0],
                            descripcion: lugar.descripcion
                        }

                        lugaresC.push(lugarCercano)
                    })

                    const ordenados = lugaresC.sort((a, b) => a.distancia - b.distancia)
                    setLugaresCercanos(ordenados)
                }
            )
        }
        suscripcion()

        return () => locacionSuscripcion.remove()

    }, [])

    const solicitarPermisos = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        Location.dist
        if (status !== "granted") {
            Alert.alert("Permisos GPS", "permisos de GPS requeridos")
            setPermisos(false)
        }
    }



    return (
        <View>
            {lugaresCercanos.map(lugar => (
                <LugarCercanoCard lugar={lugar} navigation={navigation}/>
            ))}
        </View>
    )
}