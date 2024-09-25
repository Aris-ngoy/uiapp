import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useCallback, useRef } from 'react'
import { Feather } from '@expo/vector-icons';

const inputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "delete"];
const DigitalInputs :FC<DigitalInputsProps> = ({ onValueChange }) => {

    const amount = useRef("")

    const renderItem  = useCallback(
        ({ item }: { item : string }) => (<Item item={item} onPress={() => onPress(item)} />), []);

    const onPress = useCallback(
        (item: string) => {
            handleInput(item);
        }, []);

    const handleInput = (value: string) => {
        if (value === "delete") {
            if (amount.current.length === 0) return;
            amount.current = amount.current.slice(0, -1);
        } else {
            amount.current = amount.current + value;
        }

        if (onValueChange) {
            onValueChange(amount.current);
        }
    }

  return (
    <View>
      <FlatList
        scrollEnabled={false} 
        numColumns={3}
        data={inputs} 
        renderItem={renderItem}
        />
    </View>
  )
}

export default DigitalInputs

type DigitalInputsProps = {
    onValueChange ? : (value: string) => void;
}


const Item : FC<ItemProps> = ({ item, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={.8} 
        style={styles.item}>
        {
            item === "delete" ? (
                <Feather name="x" size={24} color="black" />
            ) : (
                <Text style={styles.title}>{item}</Text>
            )
        }
    </TouchableOpacity>
);

type ItemProps = {
    item: string;
    onPress?: () => void;
}

const styles = StyleSheet.create({
    empty : {
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius : 50,
        height: 80,
        width: 80,
    },
    item: {
        backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius : 50,
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
    },
})