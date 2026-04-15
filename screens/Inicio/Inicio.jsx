import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Text, TouchableOpacity, Image } from "react-native";
import { colores } from "../../styles";
import * as ScreenOrientation from 'expo-screen-orientation'
export function Inicio({ navigation }) {

    const [orientacion, setOrientacion] = useState("portrait")

    useEffect(() => {
        const subscripcionOri = ScreenOrientation.addOrientationChangeListener((e) => {
            if (e.orientationInfo.orientation <= 2) {
                setOrientacion("portrait")
            } else {
                setOrientacion("landscape")
            }
        })
        return () => subscripcionOri.remove()
    })
    return (
        <View style={[{ flexDirection: orientacion !== 'portrait' ? 'row' : 'column'}, styles.container]}>
            <View>
                <Image source={require('../../assets/LogoUDB.png')} />
            </View>
            <View style={{ width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.titulo}>Guia UDB</Text>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("ListadoLugares")}>
                    <Text style={styles.textoBotones}>Lugares</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("LugaresCercanos")}>
                    <Text style={styles.textoBotones}>Lugares cercanos</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colores.fondo,
        padding: 20,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333333',
    },
    textoBotones: {
        fontSize: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colores.secundario,
        width: '80%',
        height: '20%',
        marginBottom: 20, // Esto da la separación entre botones
        borderRadius: 20,
        overflow: 'hidden', // Necesario para que el border radius se vea en Android
    },
});