import React, { FC, useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Text, TextPath, Defs, Path } from 'react-native-svg';

const CircularText: FC<Props> = ({ text, fontSize, size, opacity }) => {
    // Calculate the center point of the SVG
    const innerSize = useMemo(() => {
        return (size ?? 300) * 0.5; 
    }, [size]);

    // Radius is calculated to be slightly smaller than half the size
    const radius = useMemo(() => {
        return innerSize - fontSize; // Make the radius smaller to fit the text inside the viewable area
    }, [innerSize, fontSize]);

    return (
        <View>
          <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
            <Defs>
              <Path
                id="circlePath"
                d={`M ${innerSize}, ${innerSize} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${2 * radius},0 a ${radius},${radius} 0 1,1 -${2 * radius},0`}
              />
            </Defs>
            <Circle cx={innerSize} cy={innerSize} r={radius} stroke="transparent" strokeWidth="1" fill="none" />
            <Text opacity={opacity} fill="black" fontSize={fontSize}>
              <TextPath href="#circlePath">
                {text}
              </TextPath>
            </Text>
          </Svg>
        </View>
    );
};

export default CircularText;

type Props = {
  text: string,
  fontSize: number,
  size?: number
  opacity: number
};
