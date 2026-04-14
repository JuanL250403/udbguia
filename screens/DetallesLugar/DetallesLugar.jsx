import { useEffect, useState } from "react";
import { View, Text, useWindowDimensions, StyleSheet, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Detalles } from "./components/Detalles";
import { Resenias } from "./components/Resenias";
import * as ScreenOrientation from 'expo-screen-orientation'
import { MapaLugar } from "./MapaLugar";
import { Camera } from "expo-camera";
import { CapturaFoto } from "./components/CapturaFoto";
import * as MediaLibrary from 'expo-media-library'
import { CarruselFotos } from "./components/CarruselFotos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';

const Tab = createBottomTabNavigator()

export function DetallesLugar({ route, navigation }) {
    const { lugar } = route.params;
    const { height, width } = useWindowDimensions();

    const [datos, setDatos] = useState(null)
    const [orientacion, setOrientacion] = useState("portrait")
    const [verCamara, setVerCamara] = useState(false)

    useEffect(() => {
        obtenerPermisos()
        obtenerDatos()

        const subscripcionOri = ScreenOrientation.addOrientationChangeListener((e) => {
            if (e.orientationInfo.orientation <= 2) {
                setOrientacion("portrait")
            } else {
                setOrientacion("landscape")
            }
        })
        return () => subscripcionOri.remove()
    }, [])

    const obtenerPermisos = async () => {
        try {
            await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        } catch (error) {
            console.log("Error de permisos", error);
        }
    }

    const obtenerDatos = async () => {
        try {
            const lugarItem = await AsyncStorage.getItem("lugares")
            if (lugarItem) {
                let lugares = JSON.parse(lugarItem)
                const encontrado = lugares.find(l => l.id === lugar.id)
                if (encontrado) setDatos(encontrado)
            }
        } catch (error) {
            console.log("Error obteniendo datos", error)
        }
    }

    if (!datos) return <View style={{flex: 1, backgroundColor: 'white'}} />;

    if (verCamara) {
        return <CapturaFoto lugarId={datos.id} setVerCamara={setVerCamara} />
    }

    return (
        <View style={[{ flex: 1 }, orientacion !== "portrait" ? { flexDirection: 'row' } : { flexDirection: 'column' }]}>
            
            <CarruselFotos orientacion={orientacion} setVerCamara={setVerCamara} lugar={datos} />

            <View style={orientacion !== "portrait" ? { flex: 1 } : { flex: 1 }}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
                        tabBarIconStyle: { display: 'none' },
                        headerShown: false,
                        tabBarStyle: { height: 60 }
                    }}>
                    <Tab.Screen name="Detalles" component={Detalles} initialParams={{ lugar: datos }} />
                    <Tab.Screen name="Reseñas" component={Resenias} initialParams={{ lugar: datos, navigation: navigation }} />
                    <Tab.Screen name="Mapa" component={MapaLugar} initialParams={{ lugar: datos }} />
                </Tab.Navigator>
            </View>
        </View>
    )
}