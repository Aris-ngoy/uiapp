import { Text } from "@/components/Text";
import { View } from "@/components/View";
import IconButton from "@/components/IconButton";
import { Dimensions, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { Easing, Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Icon from '@expo/vector-icons/Feather';
import { useState } from "react";

const { width, height } = Dimensions.get('window');

export default function RevealScreen() {
  const progress = useSharedValue(0);
  const [reveal, setReveal] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    const size = interpolate(
      progress.value,
      [0, 1],
      [30, 1.5 * Math.max(width, height)],
      Extrapolation.CLAMP
    );
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      transform: [
        { scale: interpolate(progress.value, [0, 0.5, 1], [1, 1.3, 1.5], Extrapolation.CLAMP) },
      ],
      position: 'absolute',
      bottom: interpolate(progress.value, [0, 1], [18, 0], Extrapolation.CLAMP),
      right: 18,
    };
  });

  const animatedStyleText = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ["#000", "#fff"]
    );
    return {
      color,
    };
  });

  const changeReveal = (value : boolean) =>{
    setTimeout(() => {
        setReveal(value);
    }, 140);
  }

  const onAnimated = () => {
    if (progress.value === 0) {
        progress.value = withTiming(1, {
            duration: 1000,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
        changeReveal(true);
    } else {
        progress.value = withTiming(0, {
            duration: 1000,
            easing: Easing.out(Easing.exp),
        });
        changeReveal(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity activeOpacity={1} style={styles.touchableArea} onPress={onAnimated}>
        <View style={styles.contentContainer}>
          <View style={styles.spacer} />
          <View style={styles.viewHorizontal}>
            <Text style={styles.oppieText}>Oppie</Text>
          </View>
          <Animated.View style={[styles.animatedContainer, animatedStyle]} />
          <Animated.Text style={[styles.title, animatedStyleText]}>
            {reveal ? "Nice" : "Hübsch"}
          </Animated.Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.viewHorizontal, styles.viewHorizontalItem]}>
        <IconButton>
          <Icon name="menu" size={24} color="#000" />
        </IconButton>
        <IconButton style={styles.iconButton}>
          <Icon name="shuffle" size={22} color="#000" />
          <Text type="defaultSemiBold">Shuffle</Text>
        </IconButton>
        <IconButton>
          <Icon name="plus" size={24} color="#000" />
        </IconButton>
      </View>
      <View style={styles.viewItem}>
        <Text style={styles.smallText} type="subtitle">23 fee cards left</Text>
        <Text style={[styles.smallText, styles.smallTextColor]} type="subtitle">Upgrade for unlimited</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  touchableArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#e8e6e9',
    borderRadius: 18,
    width: width * 0.9,
    height: height * 0.8,
    alignSelf: 'center',
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  title: {
    fontSize: 30,
    letterSpacing: 1.5,
    position: 'absolute',
    top: 18,
    left: 18,
    fontWeight: 'bold',
  },
  spacer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  oppieText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  viewHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 18,
    right: 18,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: 120,
  },
  viewHorizontalItem: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  viewItem: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: 12,
  },
  smallTextColor: {
    color: '#b8b8b8',
  },
});
