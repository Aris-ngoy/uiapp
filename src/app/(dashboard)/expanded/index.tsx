import React, { FC, useCallback, useMemo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { 
  interpolateColor, 
  useAnimatedStyle, 
  useDerivedValue, 
  useSharedValue, 
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const Expanded: FC = () => {
  const items = useMemo(() => [
    <Text style={styles.item} key="1">Item 1</Text>,
    <Text style={styles.item} key="2">Item 2</Text>,
    <Text style={styles.item} key="3">Item 3</Text>
  ], []);

  return (
    <View style={styles.container}>
      <AccordionItem title='Items'>
        {items}
      </AccordionItem>
    </View>
  )
}

export default React.memo(Expanded)

type AccordionProps = {
  title: string,
  isExpanded?: boolean,
  children: React.ReactNode | React.ReactNode[]
  duration?: number,
  itemHeight?: number,
}

const AccordionItem: FC<AccordionProps> = React.memo(({ title, children, duration = 300 }) => {
  const expanded = useSharedValue(false);
  const height = useSharedValue(0);

  const progress = useDerivedValue(() => 
    expanded.value ? withTiming(1, { duration }) : withTiming(0, { duration })
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [0, height.value], Extrapolation.CLAMP),
    opacity: progress.value,
    paddingHorizontal: 10
  }));

  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['white', '#f0f0f0']),
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginTop: interpolate(progress.value, [0, 1], [0, 10]),
    marginHorizontal: interpolate(progress.value, [0, 1], [0, 10])
  }));

  const accordionContainer = useAnimatedStyle(() => ({
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#f0f0f0', 'white']),
    borderRadius: interpolate(progress.value, [0, 1], [0, 14], Extrapolation.CLAMP),
  }));

  const rotationStyle = useAnimatedStyle(() => ({
    height : 34,
    width: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#f0f0f0', 'white']),
    transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 180], Extrapolation.CLAMP)}deg` }],
  }));

  const onPress = useCallback(() => {
    expanded.value = !expanded.value;
  }, []);

  const onLayout = useCallback((e: any) => {
    height.value = e.nativeEvent.layout.height;
  }, []);

  return (
    <Animated.View style={accordionContainer}>
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <Animated.View style={headerStyle}>
          <Text style={styles.title}>{title}</Text>
          <Animated.View style={[rotationStyle]}>
            <Ionicons name="chevron-down" size={20} color="black" />
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.content, bodyStyle]}>
        <View onLayout={onLayout} style={styles.expandedContainer}>
          {children}
        </View>
      </Animated.View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop : 120,
    paddingHorizontal : 40,
  },
  content: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  expandedContainer: {
    padding: 10,
    gap: 10
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5
  },
  item: {
    fontSize: 13,
    fontWeight: 'bold',
    margin: 5,
    color : '#333'
  }
})