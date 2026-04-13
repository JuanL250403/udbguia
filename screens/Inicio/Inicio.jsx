import { View } from "react-native";
import { Button } from "react-native";

export function Inicio({navigation}){
    return(
        <View>
            <Button title="Lugares" onPress={() => navigation.navigate("ListadoLugares")}/>
            <Button title="Lugares cercanos" onPress={() => navigation.navigate("LugaresCercanos")}/>
        </View>
    )
}