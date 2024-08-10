import { Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AnimatedContainer, { paddingLeft, width, windowWidth } from '@@/src/components/AnimatedContainer'
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated'

// generate an array from number 1 to 30
const numbers = Array.from({ length: 10 }, (_, i) => i + 1)

const ScrollAnimation = () => {

    const animatedRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(animatedRef)
    const listPadding = windowWidth - width;

  return (
    <SafeAreaView style={{ flex: 1 }}>
        <Text>Scroll Animation</Text>
        <Animated.ScrollView
            ref={animatedRef} 
            snapToInterval={width}
            decelerationRate='fast'
            disableIntervalMomentum
            scrollEventThrottle={16}
            contentContainerStyle={{  width : width * numbers.length + listPadding }}
            horizontal>
            {
                numbers.map((number, index) => (
                    <AnimatedContainer 
                        scrollOffset={scrollOffset}
                        key={index} 
                        index={index} />
                ))
            }
        </Animated.ScrollView>
    </SafeAreaView>
  )
}

export default ScrollAnimation