import { Text } from "@/components/Text";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Items } from "@/utils/utils";
import DashboardItem from "@@/src/components/DashboardItem";
import { useCallback } from "react";
import { Item } from "@/models/item";

export default function DashboardScreen() {
    const renderitem = useCallback(
        ({ item }: { item : Item }) => (
            <DashboardItem {...item} />
        ), []
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <FlatList
                columnWrapperStyle={styles.columnWrapper}
                numColumns={2}
                data={Items}
                renderItem={renderitem}
            />
        </SafeAreaView>
    );
}

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
   
});
