import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { StyleSheet } from "react-native";

export default function NumbersScreen() {
    return(
        <View style={styles.container}>
            <Text>Numbers</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})