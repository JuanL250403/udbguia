import { useWindowDimensions, Button, View, Image, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Alert } from "react-native"
import { useEffect, useRef, useState } from "react"
import { CameraView } from "expo-camera"
import * as ScreenOrientation from 'expo-screen-orientation'
import * as MediaLibrary from 'expo-media-library'
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo';

export function CapturaFoto({ lugarId, setVerCamara }) {
    const { height } = useWindowDimensions()
    const camaraRef = useRef(null)
    const [foto, setFoto] = useState(null)
    const [facing, setFacing] = useState("back")
    const [esImagenGaleria, setEsImagenGaleria] = useState(false)

    useEffect(() => {
        const bloquearOrientacion = async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            )
        }

        bloquearOrientacion();

        return async () => await ScreenOrientation.unlockAsync()
    }, [])

    const tomarFoto = async () => {
        if (camaraRef.current) {
            const foto = await camaraRef.current.takePictureAsync()

            setFoto(foto)
        }
    }

    const guardarFoto = async () => {

        const fotoAsset = await MediaLibrary.createAssetAsync(foto.uri)

        asociarFotoLugar(fotoAsset.uri)
        Alert.alert("Foto Guardada", "su fotografia ha sido guardada exitosamente")
        cancelarGuardado()

    }

    const asociarFotoLugar = async (fotoAssetUri) => {
        let lugares
        try {
            const lugaresItem = await AsyncStorage.getItem("lugares")
            lugares = JSON.parse(lugaresItem)
        } catch (e) {

        }

        lugares.forEach(l => {
            if (l.id === lugarId) {
                l.imgs.push(fotoAssetUri)

            }
        });
        try {
            const lugaresStrin = JSON.stringify(lugares)
            await AsyncStorage.setItem("lugares", lugaresStrin)
        } catch (e) {
            console.log(e)
        }
    }

    const cancelarGuardado = () => {
        setEsImagenGaleria(false)
        setFoto(null)
    }

    const girarCamara = () => {
        setFacing(facing === "front" ? "back" : "front")
    }

    const verGaleria = async () => {
        const imagen = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images']
        })
        setFoto(imagen.assets[0])
        setEsImagenGaleria(true)
    }

    if (foto) {
        return (
            <View>
                <Image src={foto.uri} height={'100%'} width={'100%'} />

                <TouchableOpacity style={styles.aceptar} onPress={() => guardarFoto()}>
                    <Image source={require('../../../assets/icons/si.png')} style={{ height: 45, width: 45 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.descartar} onPress={() => cancelarGuardado()}>
                    <Image source={require('../../../assets/icons/descartar.png')} style={{ height: 45, width: 45 }} />
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View>
            <CameraView ref={camaraRef} style={{ height: '100%' }} facing={facing} />

            <TouchableOpacity style={styles.capturar} onPress={() => tomarFoto()} />
            <TouchableOpacity style={styles.regresar} onPress={() => setVerCamara(false)}>
                <Image source={require('../../../assets/icons/regresar.png')} style={{ height: 45, width: 45 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.galeria} onPress={() => verGaleria()}>
                <Image source={require('../../../assets/icons/galeria.png')} style={{ height: 45, width: 45 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.girar} onPress={() => girarCamara()}>
                <Image source={require('../../../assets/icons/girar.png')} style={{ height: 45, width: 45 }} />
            </TouchableOpacity>
        </View>


    )
}

const styles = StyleSheet.create({
    capturar: {
        position: 'absolute',
        bottom: '15%',
        right: '40%',
        borderRadius: 999,
        backgroundColor: 'white',
        height: 75,
        width: 75,
        zIndex: 999
    },
    regresar: {
        backgroundColor: "#33333379",
        borderRadius: 999,
        position: 'absolute',
        top: '5',
        right: '5',
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        width: 65,
        zIndex: 999
    },
    aceptar: {
        backgroundColor: "#33333379",
        borderRadius: 999,
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 75,
        width: 75,
        zIndex: 999
    },
    descartar: {
        backgroundColor: "#33333379",
        borderRadius: 999,
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 75,
        width: 75,
        zIndex: 999
    },
    galeria: {
        borderRadius: 999,
        backgroundColor: "#33333379",
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 75,
        width: 75,
        zIndex: 999
    },
    girar: {
        backgroundColor: "#33333379",
        borderRadius: 999,
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 75,
        width: 75,
        zIndex: 999
    }
})