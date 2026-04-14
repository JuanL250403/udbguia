import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

export function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>UDB Guide</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Lugares"
          color="#2196F3"
          onPress={() => navigation.navigate("ListadoLugares")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Lugares cercanos"
          color="#4CAF50"
          onPress={() => navigation.navigate("LugaresCercanos")}
        />
      </View>

      {/*<Button
        title="VER UBICACIÓN EN GOOGLE MAPS"
        onPress={() => {
          const url =
            "https://www.google.com/maps/search/?api=1&query=current+location";
          Linking.openURL(url);
        }}
      />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9775c',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333333',
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20, // Esto da la separación entre botones
    borderRadius: 10,
    overflow: 'hidden', // Necesario para que el border radius se vea en Android
  },
});