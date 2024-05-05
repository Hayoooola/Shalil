import { StyleSheet, Text, View } from 'react-native';


// Provides main loading of app
const MainLoading = () => {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    );
};
export default MainLoading;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});