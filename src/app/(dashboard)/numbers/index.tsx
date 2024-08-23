import { View } from "@/components/View";
import { SafeAreaView, StyleSheet } from "react-native";
import AnimatedCurrency from "./components/animated.currency";
import DigitalInputs from "./components/digital.inputs";
import { useCallback, useState } from "react";

export default function NumbersScreen() {

    const [amount, setAmount] = useState(0)

    const onValueChange = useCallback(
      (value: string) => {
        console.log(value)
        setAmount(Number(value))
      },[])
    

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <AnimatedCurrency amount={amount} index={0} />
                <DigitalInputs onValueChange={onValueChange} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})


