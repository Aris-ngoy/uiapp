import { useCallback } from "react";
import { Button, SafeAreaView, Text, TextInput, StyleSheet, View } from "react-native";
import Animated, { interpolate, interpolateColor, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Rect } from "react-native-svg";

const width = 320;
const height = 75;

const strokeWidth = 2;  // Changed from 8 to 4
const radius = 8;
const rectWidth = width * .95;
const rectHeight = height * .8;

const circleRadius = radius - strokeWidth / 2;
const circleX = strokeWidth + circleRadius;
const circleY = strokeWidth + circleRadius;

const strokeDasharray = (rectWidth + rectHeight) * 2;

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export default function TextInputScreen() {

  const progress = useSharedValue(0);
  const isFocused = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const color = interpolateColor(isFocused.value, [0, 1], ['black', 'blue']);
    const offset = strokeDasharray * (progress.value);
    
    return {
      strokeDashoffset: offset,
      stroke: color,
    };
  });

  const onFocus = useCallback(() => {
    progress.value = withTiming(1, { duration: 300 }, () => {
        progress.value = withTiming(0, { duration: 500 });
        isFocused.value = withTiming(1, { duration: 400 });
    });
  }, []);

  const onBlur = useCallback(() => {
    progress.value = withTiming(1, { duration: 300 }, () => {
        isFocused.value = withTiming(0, { duration: 400 });
        progress.value = withTiming(0, { duration: 500 });
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container}>
        <Svg width={width} height={height}>
          <AnimatedRect 
            x={circleX} 
            y={circleY}
            width={rectWidth} 
            height={rectHeight} 
            rx={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            animatedProps={animatedProps}
            strokeLinecap={'round'}
            fill={'transparent'} />
        </Svg>
        <View style={styles.input}>
            <Text style={styles.text}>Enter your name</Text>
            <TextInput 
                onFocus={onFocus} 
                onBlur={onBlur} placeholder="Enter your name" />
        </View>
      </View>
      <Text>Text Input</Text>
      <Button title="Focus" onPress={onFocus} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    position: 'absolute',
    top: rectHeight / 3.3,
    left: rectWidth * 0.08,
    width: rectWidth * 0.8,
    height: rectHeight,
    gap: 8,
  },
  text : {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  }
});
