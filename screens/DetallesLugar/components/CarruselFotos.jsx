import { useEffect, useState } from "react"
import { View, Button, Text, StyleSheet, useWindowDimensions, Image, TouchableHighlight, TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import * as MediaLibrary from 'expo-media-library'
export function CarruselFotos({ orientacion, setVerCamara, lugar }) {
    const { width, height } = useWindowDimensions()
    const [fotos, setFotos] = useState(lugar.imgs)

    useEffect(() => {
        setFotos(lugar.imgs)
        console.log(lugar.imgs)
    }, [lugar])

    return (
        <View style={[styles.carrusel, orientacion !== "portrait" ? { width: width * 0.5, height, height: height * 0.85 } : { height: "40%" }]}>
            <TouchableOpacity onPress={() => setVerCamara(true)} style={styles.agregarFoto}>
                <Image source={require('../../../assets/icons/subirImagen.png')} style={{ height: 25, width: 25 }} />

            </TouchableOpacity>
            <ScrollView horizontal={true}>
                {fotos.length !== 0 ?
                    fotos.map((foto, index) => (
                        <Image key={index} src={foto} style={styles.img} height={orientacion !== "portrait" ? height * 0.74 : "97%"} width={orientacion !== "portrait" ? width * 0.5 : width * 0.97} />
                    ))
                    :
                    <></>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    agregarFoto: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 10,
        zIndex: 999,
        padding: 12,
        borderRadius: 999,
        backgroundColor: "#ffffff79"
    },
    img: {
        borderRadius: 20,
        marginRight: 4,
        marginLeft: 4,
        marginTop: 5,
        marginBottom: 5
    },
    carrusel: {
        justifyContent: 'center'
    }
})