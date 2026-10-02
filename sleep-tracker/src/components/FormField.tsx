import { StyleSheet, Text, TextInput, View } from "react-native";

type FormFieldProps = {
    label: string;
    value: string;
};

export default function FormField({
    label,
    value,
}: FormFieldProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                defaultValue={value}
            />
        </View>
    );    
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },

    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 4,            
    },
    
    input: {
        backgroundColor: "#EEF2E5",
        borderWidth: 1,
        borderColor: "#D9E2CC",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: "#111827",
    },

});