import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";

export default function SleepEntryScreen() {
    const previousNight = new Date();

    previousNight.setDate(previousNight.getDate() - 1);

    const formattedDate = previousNight.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Log Your Sleep</Text>

                <Text style={styles.subtitle}>
                    Enter information about your previous night's sleep.
                </Text>

                <FormField
                    label="Date"
                    value={formattedDate}
                />

                <FormField
                    label="Time to Bed"
                    value="10:30 PM"
                />

                <FormField
                    label="Time Woke Up"
                    value="6:00 AM"
                />

                <Text style={styles.label}>Sleep Quality</Text>

                <View style={styles.sleepQualityContainer}>
                    <Pressable style={styles.sleepQualityButton}>
                        <Text style={styles.sleepQualityButtonText}>Poor</Text>
                    </Pressable>

                    <Pressable style={styles.sleepQualityButton}>
                        <Text style={styles.sleepQualityButtonText}>Average</Text>
                    </Pressable>

                    <Pressable style={styles.selectedQualityButton}>
                        <Text style={styles.selectedQualityButtonText}>Good</Text>
                    </Pressable>

                    <Pressable style={styles.sleepQualityButton}>
                        <Text style={styles.sleepQualityButtonText}>Excellent</Text>
                    </Pressable>


                </View>

                <Pressable style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f7fb",
        padding: 24,
    },

    content: {
        paddingBottom: 24,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: "#6b7280",
        marginBottom: 30,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 10,
    },

    sleepQualityContainer: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 30,
    },

    sleepQualityButton: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#d1d5db",
        alignItems: "center",
    },

    selectedQualityButton: {
        flex: 1,
        backgroundColor: "#6366f1",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },

    sleepQualityButtonText: {
        color: "#0c1627",
        fontWeight: "600",
    },

    selectedQualityButtonText: {
        color: "#ffffff",
        fontWeight: "700",
    },


    saveButton: {
        backgroundColor: "#6366f1",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },

    saveButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
    },
});


