import React, { FC, memo, useCallback, useMemo } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, ViewToken } from 'react-native'
import Animated, { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const data =  Array.from({ length: 50 }, (_, i) => ({ id: i })) ;

const ListView: FC = () => {
    const viewableItems = useSharedValue<ViewToken[]>([]);

    const onViewableItemsChanged = useCallback(({ viewableItems: vItems }: { viewableItems: ViewToken[] }) => {
        viewableItems.value = vItems;
    }, []);

    const renderItem = useCallback(({ item }: { item: { id: number } }) => 
        <AnimatedItem item={item} viewableItems={viewableItems} />, 
    []);

    const keyExtractor = useCallback((item: { id: number }) => item.id.toString(), []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                contentContainerStyle={styles.contentContainer}
                onViewableItemsChanged={onViewableItemsChanged}
                renderItem={renderItem}
                data={data}
                keyExtractor={keyExtractor}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
            />
        </SafeAreaView>
    )
}

export default memo(ListView);

const AnimatedItem: FC<ListItemProps> = memo(({ item, viewableItems }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const isVisible = viewableItems.value
            .some((viewableItem) => viewableItem.isViewable && viewableItem.item.id === item.id);
        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [
                { translateX: withTiming(isVisible ? 0 : 50) },
                { scale: withTiming(isVisible ? 1 : 0.75) },
            ],
        };
    });

    return <Animated.View style={[styles.item, animatedStyle]} />;
});

type ListItemProps = {
    viewableItems: SharedValue<ViewToken[]>;
    item: {
        id: number;
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 40,
    },
    item: {
        backgroundColor: 'pink',
        padding: 40,
        marginBottom: 10,
        borderRadius: 20,
        marginHorizontal: 20,
    }
});