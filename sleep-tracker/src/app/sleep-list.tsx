
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Android emulator accesses the host machine through 10.0.2.2
const API_URL = "http://10.0.2.2:3000/sleep-entries";

type SleepEntry = {
  id: number;
  date: string;
  bedTime: string;
  wakeTime: string;
  quality: number | string;
};

// Reusable component for displaying a sleep entry
function SleepEntryCard({ entry }: { entry: SleepEntry }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardDate}>{entry.date}</Text>
        <View style={styles.qualityBadge}>
          <Text style={styles.qualityText}>
            Quality: {entry.quality}
          </Text>
        </View>
      </View>

      <View style={styles.timeRow}>
        <View style={styles.timeSection}>
          <Text style={styles.timeLabel}>Time to Bed</Text>
          <Text style={styles.timeValue}>{entry.bedTime}</Text>
        </View>

        <View style={styles.timeSection}>
          <Text style={styles.timeLabel}>Time Woke Up</Text>
          <Text style={styles.timeValue}>{entry.wakeTime}</Text>
        </View>
      </View>
    </View>
  );
}

export default function SleepListScreen() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSleepEntries = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch sleep entries.");
      }

      const data: SleepEntry[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected data received from the server.");
      }

      setEntries(data);
    } catch (err) {
      setError("Unable to load sleep entries. Check your backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSleepEntries();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sleep Log History</Text>
      <Text style={styles.subtitle}>
        Review your recorded sleep entries.
      </Text>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#166534" />
          <Text style={styles.statusText}>
            Loading sleep data...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable
            onPress={loadSleepEntries}
            style={styles.retryButton}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <SleepEntryCard entry={item} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.statusText}>
              No sleep entries available.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F1",
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 24,
  },

  listContent: {
    paddingBottom: 30,
    flexGrow: 1,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D9E2CC",
    padding: 16,
    marginBottom: 14,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  cardDate: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  qualityBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  qualityText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#166534",
  },

  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  timeSection: {
    flex: 1,
  },

  timeLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
  },

  timeValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  statusText: {
    color: "#6B7280",
    fontSize: 15,
    textAlign: "center",
    marginTop: 12,
  },

  errorText: {
    color: "#DC2626",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },

  retryButton: {
    backgroundColor: "#166534",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
  },

  retryText: {
    color: "#FACC15",
    fontWeight: "700",
  },
});
