import { StyleSheet, Text, View } from "react-native";

type StatCardProps = {
  value: string;
  label: string;
};

export default function StatCard({
  value,
  label,
}: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    paddingVertical: 28,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },

  value: {
    fontSize: 23,
    fontWeight: "800",
    color: "#6366f1",
    marginBottom: 8,
  },

  label: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
  },
});