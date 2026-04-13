import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as MediaLibrary from 'expo-media-library'

export function LugarCard({ lugar, navigation}) {

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("DetallesLugar", { lugar: lugar })}>
            <View>

                <Image src={lugar.imgs[0]} style={styles.img} height={120} width={150} />
            </View>
            <View>
                <Text>{lugar.nombre}</Text>
                <Text>{lugar.tipo}</Text>
                <Text>{lugar.descripcion}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 20,
        margin: 10,
        padding: 10
    },
    img: {
        borderRadius: 20,
        marginRight: 10,
        height: 20,
        width: 20
    }
})