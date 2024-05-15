import { StyleSheet } from "react-native";
import VARIABLES from "../enums/variables";


// Provides global Styles to the App
const featuredStyles = StyleSheet.create({
    input: {
        backgroundColor: VARIABLES.WHITE_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        fontFamily: "vazir",
        borderRadius: 10,
        color: VARIABLES.BLACK_COLOR
    }
});

export default featuredStyles;