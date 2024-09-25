import { FC } from "react";
import { Dimensions, SafeAreaView, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, useSharedValue, withTiming } from "react-native-reanimated";

const cardItems = Array.from({ length: 10 }, (_, i) => i + 1)

 const fullWidth = Dimensions.get('window').width;
 const cardWidth = fullWidth * .8;
 const cardHeight = cardWidth * .75;
 const cardMargin = (fullWidth - cardWidth) / 2;
 const duration = 400;
 const totalLength = cardItems.length;
 const maxVisbleCards = 4


export default function CardsScreen() {

    const activeIndex = useSharedValue(0)

    const flingRight = Gesture.Fling().direction(Directions.RIGHT).onStart((e) => {
        if(activeIndex.value === 0) {
            return
        }
        console.log('fling right')
        activeIndex.value = withTiming(activeIndex.value - 1, { duration })
    })

    const flingLeft = Gesture.Fling().direction(Directions.LEFT).onStart((e) => {
        if(activeIndex.value === cardItems.length - 1) {
            return
        }
        console.log('fling left')
        activeIndex.value = withTiming(activeIndex.value + 1, { duration })
    })

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Cards</Text>
            <GestureDetector gesture={Gesture.Exclusive(flingRight, flingLeft)}>
                <View 
                    pointerEvents="box-none"
                    style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: 10
                    }}>
                    {
                        cardItems.map((item, index) => (
                            <CardItem key={index} index={index} activeIndex={activeIndex}  />
                        ))
                    }
                </View>
            </GestureDetector>
        </SafeAreaView>
    );
}

const CardItem : FC<CardProps> = ({ index, activeIndex }) => {

    const animatedStyle = useAnimatedStyle(()=>{

        const scale = interpolate(activeIndex.value,
            [index - 1, index, index + 1],
            [0.9, 1, 1],
        )

        const opacity = interpolate(activeIndex.value,
            [index - 1, index, index + 1,],
            [1, 1, 1 - 1 / maxVisbleCards],
        )

        const translateX = interpolate(activeIndex.value,
            [index - 1, index, index + 1],
            [cardWidth + (cardWidth * .17), 0, 0],
        )

        const degree = interpolate(activeIndex.value,
            [index - 1, index, index + 1,  index + 2],
            [10, 0, -6, -16],
        )

        const width = interpolate(activeIndex.value,
            [index - 1, index, index + 1,  index + 2],
            [cardWidth, cardWidth, cardWidth * .8, cardWidth * .6],
        )

        const height = interpolate(activeIndex.value,
            [index - 1, index, index + 1,  index + 2],
            [cardHeight, cardHeight, cardHeight * .9, cardHeight * .6],
        )

        const top = interpolate(activeIndex.value,
            [index - 1, index, index + 1],
            [5, 0, cardHeight * .05],
        )

        const left = interpolate(activeIndex.value,
            [index - 1, index, index + 1],
            [cardMargin, cardMargin, cardWidth * .1],
        )

        return{
            left,
            top,
            width,
            height,
            position: 'absolute',
            zIndex: totalLength - index,
            opacity,
            transform: [
                { scale },
                { translateX },
                { rotateZ: `${degree}deg` },
            ],
        }
    })
    return (
        <Animated.View style={[styles.card, animatedStyle]} />)
};

type CardProps = {
    index : number
    activeIndex : SharedValue<number>
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginHorizontal : 14,
        marginBottom: 8,
        marginTop: 18
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    card : {
        width: cardWidth,
        height: cardHeight,
        backgroundColor: '#03c788',
        marginBottom: 10,
        borderRadius: 14,
    }

});