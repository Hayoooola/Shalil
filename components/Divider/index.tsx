import { StyleSheet, View } from 'react-native';
import VARIABLES from '../../enums/variables';


const MainDivider = () => {
    return (
        <View style={styles.divider} />
    );
};
export default MainDivider;

const styles = StyleSheet.create({
    divider: {
        width: "90%",
        margin: "auto",
        height: 1,
        backgroundColor: VARIABLES.SECONDARY_COLOR,
        paddingHorizontal: 20
    }
});