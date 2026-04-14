import { View } from "react-native";
import { Button } from "react-native";
import { Linking } from 'react-native';

export function Inicio({navigation}){
    return(
        <View>
            <Button title="Lugares" onPress={() => navigation.navigate("ListadoLugares")}/>
            <Button title="Lugares cercanos" onPress={() => navigation.navigate("LugaresCercanos")}/>
                <Button 
  title="VER UBICACIÓN EN GOOGLE MAPS" 
  onPress={() => {
    const url = "https://www.google.com/maps/search/?api=1&query=current+location";
    Linking.openURL(url);
  }} 
/>
        </View>
    )
}