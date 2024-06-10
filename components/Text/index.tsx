import { StyleSheet, Text } from 'react-native';


const CustomText = (props) => {
    return (
        <Text style={styles.text}>
            {props.children}
        </Text>
    );
};
export default CustomText;

const styles = StyleSheet.create({
    text: {
        fontFamily: "vazir",
        fontWeight: "normal",
        fontSize: 14
    }
});