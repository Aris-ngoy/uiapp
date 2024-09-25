import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { formatter, getKey } from '@@/src/utils/utils';
import Animated, { LinearTransition, SlideInDown, SlideOutDown, SlideOutUp } from 'react-native-reanimated';

const AnimatedCurrency: FC<AnimatedCurrencyProps> = ({ amount }) => {
    const formatted = formatter.format(+amount);
    const splitted = formatted.split('');

    return (
        <Animated.View layout={LinearTransition.springify()} style={styles.container}>
            <Text style={styles.title}>R </Text>
            {splitted.map((char, idx) => (
                <Animated.Text
                    allowFontScaling
                    style={[styles.input, { fontSize: splitted.length > 8 ? 40 : 58 }]}
                    key={char + getKey(idx, +amount)}
                    layout={LinearTransition.springify()}
                    entering={SlideInDown.duration(300).damping(35).stiffness(400).springify()}
                    exiting={
                        idx === 0
                            ? SlideOutUp.duration(200).damping(35).stiffness(400)
                            : SlideOutDown.duration(200).damping(35).stiffness(400)
                    }>
                    {char}
                </Animated.Text>
            ))}
        </Animated.View>
    )
}

export default AnimatedCurrency

type AnimatedCurrencyProps = {
    amount: number;
    index: number;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        overflow: 'hidden',
        width: '90%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    input: {
        fontWeight: 'bold',
    }
})