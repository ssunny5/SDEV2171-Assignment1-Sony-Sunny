import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SleepEntryScreen() {
  // Form state
  const [date, setDate] = useState("");
  const [bedTime, setBedTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [sleepQuality, setSleepQuality] = useState("Good");

  // Validation and feedback state
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validate date format and actual calendar date
  const isValidDate = (value: string): boolean => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    const [year, month, day] = value.split("-").map(Number);

    const parsedDate = new Date(year, month - 1, day);

    return (
      parsedDate.getFullYear() === year &&
      parsedDate.getMonth() === month - 1 &&
      parsedDate.getDate() === day
    );
  };

  // Validate 24-hour time format
  const isValidTime = (value: string): boolean => {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
  };

  // Individual field validation
  const dateValid = isValidDate(date.trim());
  const bedTimeValid = isValidTime(bedTime.trim());
  const wakeTimeValid = isValidTime(wakeTime.trim());

  // Show feedback when a field contains data
  // or after the user attempts submission
  const showDateFeedback = submitted || date.length > 0;
  const showBedFeedback = submitted || bedTime.length > 0;
  const showWakeFeedback = submitted || wakeTime.length > 0;

  const handleSave = () => {
    setSubmitted(true);
    setSuccess(false);

    // Stop submission if any field is invalid
    if (!dateValid || !bedTimeValid || !wakeTimeValid) {
      return;
    }

    // Store the submitted entry in local component state only
    const sleepEntry = {
      date: date.trim(),
      bedTime: bedTime.trim(),
      wakeTime: wakeTime.trim(),
      quality: sleepQuality,
    };

    console.log("Sleep entry submitted:", sleepEntry);

    // Show success feedback
    setSuccess(true);

    // Reset the form
    setDate("");
    setBedTime("");
    setWakeTime("");
    setSleepQuality("Good");
    setSubmitted(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Log Your Sleep</Text>

        <Text style={styles.subtitle}>
          Enter information about your previous night's sleep.
        </Text>

        {/* Date Input */}
        <Text style={styles.label}>Date</Text>

        <View
          style={[
            styles.inputContainer,
            showDateFeedback &&
              (dateValid
                ? styles.inputSuccess
                : styles.inputError),
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#9CA3AF"
            value={date}
            onChangeText={(value) => {
              setDate(value);
              setSuccess(false);
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {showDateFeedback && (
            <Text
              style={
                dateValid ? styles.validIcon : styles.invalidIcon
              }
            >
              {dateValid ? "✓" : "!"}
            </Text>
          )}
        </View>

        {showDateFeedback && !dateValid && (
          <Text style={styles.fieldError}>
            Enter a valid date in YYYY-MM-DD format.
          </Text>
        )}

        {/* Bedtime Input */}
        <Text style={styles.label}>Time to Bed</Text>

        <View
          style={[
            styles.inputContainer,
            showBedFeedback &&
              (bedTimeValid
                ? styles.inputSuccess
                : styles.inputError),
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="22:30"
            placeholderTextColor="#9CA3AF"
            value={bedTime}
            onChangeText={(value) => {
              setBedTime(value);
              setSuccess(false);
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {showBedFeedback && (
            <Text
              style={
                bedTimeValid ? styles.validIcon : styles.invalidIcon
              }
            >
              {bedTimeValid ? "✓" : "!"}
            </Text>
          )}
        </View>

        {showBedFeedback && !bedTimeValid && (
          <Text style={styles.fieldError}>
            Enter a valid time in 24-hour format (HH:mm).
          </Text>
        )}

        {/* Wake Time Input */}
        <Text style={styles.label}>Time Woke Up</Text>

        <View
          style={[
            styles.inputContainer,
            showWakeFeedback &&
              (wakeTimeValid
                ? styles.inputSuccess
                : styles.inputError),
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="06:30"
            placeholderTextColor="#9CA3AF"
            value={wakeTime}
            onChangeText={(value) => {
              setWakeTime(value);
              setSuccess(false);
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {showWakeFeedback && (
            <Text
              style={
                wakeTimeValid ? styles.validIcon : styles.invalidIcon
              }
            >
              {wakeTimeValid ? "✓" : "!"}
            </Text>
          )}
        </View>

        {showWakeFeedback && !wakeTimeValid && (
          <Text style={styles.fieldError}>
            Enter a valid wake time in 24-hour format (HH:mm).
          </Text>
        )}

        {/* Sleep Quality Selection */}
        <Text style={styles.label}>Sleep Quality</Text>

        <View style={styles.sleepQualityContainer}>
          {["Poor", "Fair", "Good", "Great"].map((quality) => (
            <Pressable
              key={quality}
              onPress={() => {
                setSleepQuality(quality);
                setSuccess(false);
              }}
              style={[
                styles.sleepQualityButton,
                sleepQuality === quality &&
                  styles.selectedSleepQualityButton,
              ]}
            >
              <Text
                style={[
                  styles.sleepQualityButtonText,
                  sleepQuality === quality &&
                    styles.selectedSleepQualityButtonText,
                ]}
              >
                {quality}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* General Validation Feedback */}
        {submitted &&
          (!dateValid || !bedTimeValid || !wakeTimeValid) && (
            <View style={styles.errorBox}>
              <Text style={styles.errorBoxText}>
                Please correct the highlighted fields before saving.
              </Text>
            </View>
          )}

        {/* Success Feedback */}
        {success && (
          <View style={styles.successBox}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successText}>
              Sleep log submitted successfully!
            </Text>
          </View>
        )}

        {/* Save Button */}
        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
        >
          <Text style={styles.saveButtonText}>
            Save Sleep Log
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8F1",
    padding: 24,
  },

  content: {
    paddingBottom: 40,
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
    color: "#6B7280",
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },

  // Input field container
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2CC",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    paddingVertical: 14,
  },

  // Invalid input effect
  inputError: {
    borderColor: "#DC2626",
    borderWidth: 2,
    backgroundColor: "#FEF2F2",
  },

  // Valid input effect
  inputSuccess: {
    borderColor: "#16A34A",
    borderWidth: 2,
    backgroundColor: "#F0FDF4",
  },

  validIcon: {
    color: "#16A34A",
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 8,
  },

  invalidIcon: {
    color: "#DC2626",
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 8,
  },

  fieldError: {
    color: "#DC2626",
    fontSize: 12,
    marginTop: -14,
    marginBottom: 16,
  },

  // Sleep quality buttons
  sleepQualityContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 30,
  },

  sleepQualityButton: {
    flex: 1,
    backgroundColor: "#EEF2E5",
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D9E2CC",
    alignItems: "center",
  },

  selectedSleepQualityButton: {
    backgroundColor: "#166534",
    borderColor: "#166534",
  },

  sleepQualityButtonText: {
    color: "#0C1627",
    fontWeight: "600",
  },

  selectedSleepQualityButtonText: {
    color: "#FACC15",
    fontWeight: "700",
  },

  // General validation error box
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },

  errorBoxText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "600",
  },

  // Success confirmation box
  successBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderColor: "#86EFAC",
    borderWidth: 1,
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },

  successIcon: {
    color: "#166534",
    fontSize: 20,
    fontWeight: "800",
    marginRight: 10,
  },

  successText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },

  // Save button
  saveButton: {
    backgroundColor: "#166534",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#FACC15",
    fontSize: 16,
    fontWeight: "700",
  },

  saveButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});