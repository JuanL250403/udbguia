import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Inicio } from "./screens/Inicio/Inicio";
import { NavigationContainer } from "@react-navigation/native";
import { ListadoLugares } from "./screens/ListadoLugares/ListadoLugares";
import { LugaresCercanos } from "./screens/LugaresCercanos/LugaresCercanos";
import { data } from "./data";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DetallesLugar } from "./screens/DetallesLugar/DetallesLugar";
import * as Location from 'expo-location'
import { AgregarResenia } from "./screens/DetallesLugar/AgregarResenia";


const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    guardarDatos();
  }, []);

  const guardarDatos = async () => {
    const dataStorage = AsyncStorage.getItem("lugares");

    if(!data){
      return;
    }

    try {
      const lugaresString = JSON.stringify(data);
      await AsyncStorage.setItem("lugares", lugaresString);
    } catch (e) {
      console.error(e);
    }
  };



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="ListadoLugares" component={ListadoLugares} />
        <Stack.Screen name="DetallesLugar" component={DetallesLugar} />
        <Stack.Screen name="LugaresCercanos" component={LugaresCercanos} />
        <Stack.Screen name="AgregarResenia" component={AgregarResenia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
