import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as MediaLibrary from 'expo-media-library'
import { colores } from "../../../styles";

export function LugarCard({ lugar, navigation }) {

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("DetallesLugar", { lugar: lugar })}>
            <View>
                {/* Corregí el src para que sea compatible y el tamaño para que se vea bien */}
                {
                    lugar.imgs[0] ?
                        <Image
                            source={{ uri: lugar.imgs[0] }}
                            style={styles.img}
                        />
                        :
                        <Image
                            source={require("../../../assets/icons/noImagen.png")}
                            style={[styles.noImg]}
                        />
                }

            </View>

            {/* Agregamos el estilo infoContent con flex: 1 para que el texto NO se salga */}
            <View style={styles.infoContent}>
                <Text style={styles.nombre} numberOfLines={1}>
                    {lugar.nombre}
                </Text>
                <Text style={styles.tipo}>
                    {lugar.tipo}
                </Text>
                <Text style={styles.descripcion} numberOfLines={2}>
                    {lugar.descripcion}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        borderWidth: 3,
        borderRadius: 20,
        marginVertical: 8,
        marginHorizontal: 10,
        padding: 10,
        borderColor: '#2FACE3r[p',
        backgroundColor: '#fff', // Fondo blanco para que resalte
        alignItems: 'center',
        overflow: 'hidden' // Corta cualquier exceso
    },
    img: {
        borderRadius: 15,
        marginRight: 15,
        height: 150, // Ajustado para que quepa bien en el cuadro
        width: 150,
        backgroundColor: '#eee'
    },
    noImg: {
        padding: 40,
        borderRadius: 15,
        marginRight: 15,
        height: 150, // Ajustado para que quepa bien en el cuadro
        width: 150,
        backgroundColor: '#eee'
    },
    infoContent: {
        flex: 1, // <--- ESTO evita que se salga
        justifyContent: 'center'
    },
    nombre: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 2
    },
    tipo: {
        fontSize: 18,
        color: '#666',
        marginBottom: 4
    },
    descripcion: {
        fontSize: 13,
        color: '#444'
    }
})