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
import { colores } from "./styles";

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    guardarDatos();

    
  }, []);

  const guardarDatos = async () => {
    const dataStorage = await AsyncStorage.getItem("lugares");

    if(dataStorage){
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
      <Stack.Navigator screenOptions={
        {
          headerStyle: {
            backgroundColor: colores.primario
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: 30
          },
          headerTintColor: colores.secundario,

        }
      }
      >
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen options={{title: "Listado de lugares"}} name="ListadoLugares" component={ListadoLugares} />
        <Stack.Screen options={{title: "Detalles"}} name="DetallesLugar" component={DetallesLugar}/>
        <Stack.Screen options={{title: "Lugares cercanos"}} name="LugaresCercanos" component={LugaresCercanos} />
        <Stack.Screen options={{title: "Agregar reseña"}} name="AgregarResenia" component={AgregarResenia} />
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
