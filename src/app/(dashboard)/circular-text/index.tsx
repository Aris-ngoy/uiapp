import { View, Text } from 'react-native'
import React, { FC } from 'react'
import CircularText from '@@/src/components/circluar-text/CircularText'
import { MotiView } from 'moti'

const textItems = [
    "地球はすべての人の必要を満たすことができますが、すべての人の欲望を満たすことはできません",
    "Mabele epesaka mingi mpo na kokokisa bamposa ya moto nyonso, kasi te mpo na koyokisa lokoso ya moto nyonso",
    "Earth provides enough to satisfy every man's needs, but not every man's greed",
    "Die Erde bietet genug, um die Bedürfnisse jedes Menschen zu befriedigen, aber nicht die Gier jedes Menschen",
]

const CircularTypography : FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {
        textItems.map((text, index) => {
            const size = 350 * (1 - index * 0.2); // Decrease size by 10% per index
            const fontSize = 24 * (1 - index * 0.1); // Decrease font size by 20% per index
            const opacity = 1 - (index * (0.6 / (textItems.length - 1))); // Calculate opacity
            return (
                <MotiView
                    style={{
                        position: 'absolute',
                    }}
                    from={{ rotate: '0deg', scale: 0.9 }}
                    animate={{ rotate:  '360deg', scale: 1 }}
                    transition={{
                        type: 'timing',
                        duration: 5500,
                        repeat: Infinity,
                        delay: (textItems.length - index - 1) * 150,
                    }}
                    key={index}>
                    <CircularText size={size} text={text} fontSize={fontSize} opacity={opacity} />
                </MotiView>
            )
        })
      }
    </View>
  )
}

export default CircularTypography