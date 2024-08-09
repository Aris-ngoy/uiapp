import React, { FC } from 'react'
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native'

const IconButton : FC<Props> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.icon, style]} onPress={onPress}>
        {children}
    </TouchableOpacity>
  )
}

export default IconButton

type Props = {
    children : React.ReactNode,
    onPress ? : () => void,
    style? : ViewStyle
}

const styles = StyleSheet.create({
    icon : {
        height: 50,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#e8e6e9',
    }
})