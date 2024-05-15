import { StyleSheet, View } from 'react-native';

import Chart from './chart';
import Cards from './cards';
import Review from './review';


const DashboardScreen = () => {

    return (
        <View style={styles.container}>
            <Chart />
            <Cards />
            <Review />
        </View>
    );
};
export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        paddingTop: 60
    }
});