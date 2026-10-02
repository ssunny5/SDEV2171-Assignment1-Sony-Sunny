import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import NavigationCard from "@/components/NavigationCard";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sleep Tracker</Text>

        <Text style={styles.subtitle}>
          Track your sleep habits and understand your nightly sleep patterns.
        </Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Last Night</Text>
        <Text style={styles.summaryValue}>7h 32m</Text>
        <Text style={styles.summaryDescription}>Good sleep quality</Text>
      </View>

      <Text style={styles.sectionTitle}>
        What would you like to do?
      </Text>

      <NavigationCard
        title="Log Sleep"
        description="Record last night's sleep information"
        onPress={() => router.push("/sleep-entry")}
      />

      <NavigationCard
        title="View Statistics"
        description="Review your recent sleep patterns"
        onPress={() => router.push("/sleep-statistics")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    padding: 24,
  },

  header: {
    marginTop: 20,
    marginBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#6b7280",
  },

  summary: {
    backgroundColor: "#166534",
    padding: 24,
    borderRadius: 20,
    marginBottom: 32,
  },

  summaryLabel: {
    color: "#e0e7ff",
    fontSize: 14,
    marginBottom: 8,
  },

  summaryValue: {
    color: "#FACC15",
    fontSize: 34,
    fontWeight: "800",
  },

  summaryDescription: {
    color: "#e0e7ff",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2537",
    marginBottom: 16,
  },
});