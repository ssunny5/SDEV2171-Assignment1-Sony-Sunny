import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import StatCard from "@/components/StatCard";

export default function SleepStatisticsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sleep Statistics</Text>
            <Text style={styles.subtitle}>
                Your Sleep Statistics for the Last 7 Days
            </Text>

            <View style={styles.grid}>
                <StatCard 
                    value="7" 
                    label="Average Sleep Duration" 
                />

                <StatCard 
                    value="Good" 
                    label="Average Sleep Quality" 
                />
                <StatCard 
                    value="10:42 PM" 
                    label="Average Time to Bed" 
                />
                <StatCard 
                    value="6:21 AM" 
                    label="Average Wake-up Time" 
                />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fb",
        padding: 24,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
        marginTop: 20,
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        color: "#6b7280",
        marginBottom: 30,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 16,      
    },

});