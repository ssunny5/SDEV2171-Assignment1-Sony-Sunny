
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import StatCard from "@/components/StatCard";

// Local backend API 
const API_URL = "http://10.0.2.2:3000/sleep-entries";

type SleepEntry = {
  id: number;
  date: string;
  bedTime: string;
  wakeTime: string;
  quality: number | string;
};

type SleepStats = {
  totalEntries: number;
  averageQuality: string;
  averageBedTime: string;
  averageWakeTime: string;
  averageDuration: string;
};

// Convert HH:mm into minutes after midnight
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Format minutes as a 12-hour clock time
const formatTime = (minutes: number): string => {
  const totalMinutes = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const hours24 = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;

  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;

  return `${hours12}:${mins.toString().padStart(2, "0")} ${period}`;
};

// Convert bedtime/wake time into sleep duration
const calculateDuration = (bedTime: string, wakeTime: string): number => {
  const bedMinutes = timeToMinutes(bedTime);
  const wakeMinutes = timeToMinutes(wakeTime);

// Handle sleep periods crossing midnight
  return (wakeMinutes - bedMinutes + 1440) % 1440;
};

// Convert numerical or categorical quality values to a score
const qualityToNumber = (quality: number | string): number => {
  if (typeof quality === "number") {
    return quality;
  }

  const qualityMap: Record<string, number> = {
    poor: 1,
    fair: 2,
    good: 3,
    great: 4,
  };

  const normalized = quality.trim().toLowerCase();

  return qualityMap[normalized] ?? Number(normalized);
};

// Calculate a clock-time average using circular arithmetic.
// This handles bedtimes around midnight correctly.
const calculateAverageTime = (
  entries: SleepEntry[],
  field: "bedTime" | "wakeTime"
): string => {
  let sinSum = 0;
  let cosSum = 0;

  entries.forEach((entry) => {
    const minutes = timeToMinutes(entry[field]);
    const angle = (minutes / 1440) * 2 * Math.PI;

    sinSum += Math.sin(angle);
    cosSum += Math.cos(angle);
  });

  if (Math.hypot(sinSum, cosSum) < 0.000001) {
    return "N/A";
  }

  let averageAngle = Math.atan2(sinSum, cosSum);

  if (averageAngle < 0) {
    averageAngle += 2 * Math.PI;
  }

  return formatTime((averageAngle / (2 * Math.PI)) * 1440);
};

const calculateStatistics = (entries: SleepEntry[]): SleepStats => {
  const totalEntries = entries.length;

  const totalDuration = entries.reduce(
    (sum, entry) =>
      sum + calculateDuration(entry.bedTime, entry.wakeTime),
    0
  );

  const qualityScores = entries
    .map((entry) => qualityToNumber(entry.quality))
    .filter((score) => Number.isFinite(score));

  const averageQuality =
    qualityScores.length > 0
      ? (
          qualityScores.reduce((sum, score) => sum + score, 0) /
          qualityScores.length
        ).toFixed(1)
      : "N/A";

  const averageDurationMinutes = Math.round(
    totalDuration / totalEntries
  );

  const durationHours = Math.floor(averageDurationMinutes / 60);
  const durationMins = averageDurationMinutes % 60;

  return {
    totalEntries,
    averageQuality,
    averageBedTime: calculateAverageTime(entries, "bedTime"),
    averageWakeTime: calculateAverageTime(entries, "wakeTime"),
    averageDuration: `${durationHours}h ${durationMins}m`,
  };
};

export default function SleepStatisticsScreen() {
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSleepEntries = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: SleepEntry[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid server response");
      }

      setEntries(data);
    } catch (err) {
      console.error("Failed to load statistics:", err);
      setError("Unable to load sleep statistics. Check your backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSleepEntries();
  }, []);

  const stats =
    entries.length > 0 ? calculateStatistics(entries) : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Sleep Statistics</Text>

        <Text style={styles.subtitle}>
          Statistics calculated from your sleep records
        </Text>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#166534" />
            <Text style={styles.statusText}>
              Loading sleep statistics...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>

            <Pressable
              style={styles.retryButton}
              onPress={loadSleepEntries}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </Pressable>
          </View>
        ) : stats ? (
          <>
            <View style={styles.grid}>
              <StatCard
                value={stats.averageDuration}
                label="Average Sleep Duration"
              />

              <StatCard
                value={stats.averageQuality}
                label="Average Sleep Quality"
              />

              <StatCard
                value={stats.averageBedTime}
                label="Average Time to Bed"
              />

              <StatCard
                value={stats.averageWakeTime}
                label="Average Wake-up Time"
              />

              <StatCard
                value={stats.totalEntries.toString()}
                label="Total Sleep Entries"
              />
            </View>

            <Text style={styles.footer}>
              Calculated from {stats.totalEntries} sleep records
            </Text>
          </>
        ) : (
          <Text style={styles.statusText}>
            No sleep records available to calculate statistics.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F1",
  },

  content: {
    padding: 24,
    paddingBottom: 40,
    flexGrow: 1,
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
    color: "#6B7280",
    marginBottom: 30,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },

  statusText: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 12,
  },

  errorText: {
    fontSize: 14,
    color: "#DC2626",
    textAlign: "center",
    marginBottom: 20,
  },

  retryButton: {
    backgroundColor: "#166534",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  retryText: {
    color: "#FACC15",
    fontWeight: "700",
  },

  footer: {
    color: "#6B7280",
    fontSize: 13,
    textAlign: "center",
    marginTop: 24,
  },
});
