import { TouchableOpacity, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Item } from '../models/item'
import { Text } from './Text'
import { useRouter } from 'expo-router'

const DashboardItem : FC<Item> = ({ title, route }) => {

    const router = useRouter()  

    const handlePress = () => {
        router.push(`${route}`as any)
    }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={.7} style={styles.container}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

export default DashboardItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})