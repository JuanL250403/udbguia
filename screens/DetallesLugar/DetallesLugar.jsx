import { useEffect, useRef, useState } from "react";
import { View, Text, useWindowDimensions, StyleSheet, Button, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Inicio } from "../Inicio/Inicio";
import { Detalles } from "./components/Detalles";
import { Resenias } from "./components/Resenias";
import * as ScreenOrientation from 'expo-screen-orientation'
import { MapaLugar } from "./MapaLugar";
import { CameraView, Camera, useCameraPermissions } from "expo-camera";
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
    const [orientacion, setOrientacion] = useState(null)
    const [permisosCamara, setPermisosCamara] = useCameraPermissions()
    const [verCamara, setVerCamara] = useState(false)
    const [fotos, setFotos] = useState([])

    useEffect(() => {
        obtenerPermisos()

        obtenerDatos()

        getOrientacionInicial()

        const subscripcionOri = ScreenOrientation.addOrientationChangeListener(
            (e) => {
                if (e.orientationInfo.orientation > 0 && e.orientationInfo.orientation <= 2) {
                    setOrientacion("portrait")
                } else {
                    setOrientacion("landscape")
                }
            }
        )
        return () => subscripcionOri.remove()
    }, [])

    useEffect(() => {
        obtenerDatos()
    }, [verCamara])

    const getOrientacionInicial = async () => {
        const orientacionIni = await ScreenOrientation.getOrientationAsync()
        if (orientacionIni > 0 && orientacionIni <= 2) {
            setOrientacion("portrait")
        } else {
            setOrientacion("landscape")
        }

    };

    const obtenerPermisos = async () => {
        try {
            const status = await Camera.requestCameraPermissionsAsync()

            if (!status.granted) {
                Alert.alert('Permisos necesarios', 'Los permisos de camara son requeridos')
                navigation.goBack()
            }
        } catch (error) {

        }
        try {
            const status = await MediaLibrary.requestPermissionsAsync();
            if (!status.granted) {
                Alert.alert('Permisos necesarios', 'Los permisos de multimedia son requeridos')
                navigation.goBack()
            }
        } catch (error) {
            console.log(error)

        }

        try {
            const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!status.granted) {
                Alert.alert('Permisos necesarios', 'Los permisos de multimedia son requeridos')
                navigation.goBack()
            }
        } catch (e){}
    }

    const obtenerDatos = async () => {
        try {
            const lugarItem = await AsyncStorage.getItem("lugares")
            let lugares = JSON.parse(lugarItem)
            lugares.forEach(l => {
                if (l.id == lugar.id) {
                    setDatos(l)
                }
            });
        } catch (error) {
            console.log(e)
        }
    }

    if (!datos) {
        return (
            <View>

            </View>
        )
    }

    if (permisosCamara) {
        if (!permisosCamara.granted) {
            return (
                <View>
                </View>)
        }
        if (verCamara) {
            return (
                <CapturaFoto lugarId={datos.id} setVerCamara={setVerCamara} />
            )
        }
    }

    return (
        <View style={[{ marginBottom: 20 }, orientacion !== "portrait" ? { flex: 1, flexDirection: 'row' } : { height: height }]}>

            <CarruselFotos orientacion={orientacion} setVerCamara={setVerCamara} lugar={datos} />

            <View style={[orientacion !== "portrait" ? { height: height * 0.85, width: width * 0.6 } : { width: width, height: "60%" }]}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: {
                            height: "30%",
                            fontSize: 20
                        },
                        tabBarIconStyle: {
                            display: 'none'
                        },
                        headerShown: false,
                        tabBarStyle: {
                            height: orientacion !== "portrait" ? "30%" : "30%"
                        }
                    }}>
                    <Tab.Screen component={Detalles} name="Detalles" initialParams={{ lugar: datos }} />
                    <Tab.Screen component={Resenias} name="Reseñas" initialParams={{ lugar: datos, navigation: navigation }} />
                    <Tab.Screen component={MapaLugar} name="Mapa" initialParams={{ lugar: datos }} />
                </Tab.Navigator>
            </View>
        </View>
    )
}

