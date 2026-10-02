import { Pressable, StyleSheet, Text, View } from "react-native";

type NavigationCardProps = {
    title: string;
    description: string;
    onPress: () => void;
};

export default function NavigationCard({
    title,
    description,
    onPress,
}: NavigationCardProps) {
    return (
        <Pressable onPress={onPress} style={styles.card}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>

            <Text style={styles.arrow}>→</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3,
    },

    title:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 6,
    },

    description: {
        fontSize: 14,
        color: "#4b5563",
    },

    arrow: {
        fontSize: 30,
        color: "#9ca3af",
    },
});