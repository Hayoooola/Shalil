import { ActivityIndicator, StyleSheet, View } from 'react-native';
import VARIABLES from '../../enums/variables';


// Provides main loading of app
const MainLoading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={VARIABLES.PRIMARY_COLOR_DARK} />
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