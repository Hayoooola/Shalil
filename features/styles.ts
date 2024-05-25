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
        direction: 'rtl',
        textAlign: "right",
        color: VARIABLES.BLACK_COLOR
    },
    text: {
        fontFamily: "vazir",
        fontSize: 14
    },
    shadow: {
        elevation: 5,
        shadowColor: "#333",
        shadowOffset: {
            height: 5,
            width: 5
        },
        shadowOpacity: 1,
        shadowRadius: 5
    }
});

export default featuredStyles;