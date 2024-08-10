import { Text, StyleSheet, Dimensions } from 'react-native'
import React, { FC } from 'react'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'

export const windowWidth = Dimensions.get('window').width
export const width = windowWidth * .8
const height = width * .6
export const paddingLeft = 30;

//generate random color based on the index
const randomColor = (index: number) => {
    const colors = [
        'red',
        'blue',
        'green',
        'yellow',
        'purple',
        'orange',
        'pink',
        'brown',
        'gray',
        'black',
        'white',
        'cyan',
        'magenta',
        'teal',
        'lime',
        'maroon',
        'navy'
    ]
    return colors[index % colors.length]
}



const AnimatedContainer: FC<Item> = ({ index, scrollOffset }) => {

    
    const animatedPosition = useAnimatedStyle(() => {
        const currentIndex =scrollOffset.value / width;
        const translateX = interpolate(
            currentIndex,
            [index -2, index -1, index, index + 1],
            [120, 30, 0, - width - paddingLeft * 2],
            Extrapolation.CLAMP
        )
        const scale = interpolate(
            currentIndex,
            [index -2, index -1, index, index + 1],
            [0.8, 0.9, 1, 1],
            Extrapolation.CLAMP
        )
        return {
            left : paddingLeft,
            transform: [{ translateX : scrollOffset.value + translateX }, { scale }],
        }
    })


  

  return (
    <Animated.View style={[{ zIndex : - index, backgroundColor : randomColor(index) }, styles.container, animatedPosition]}>
      <Text>Animated Container</Text>
    </Animated.View>
  )
}

export default AnimatedContainer

const styles = StyleSheet.create({
    container : {
        width,
        height,
        borderRadius: 14,
        padding : 22,
        position: 'absolute',
    }
})

type Item = {
    index : number
    scrollOffset : SharedValue<number>
}