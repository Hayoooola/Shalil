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
        elevation: 3,
        shadowColor: "#333",
        shadowOffset: {
            height: 3,
            width: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    screen_container: {
        flex: 1,
        paddingHorizontal: 20,
        display: "flex",
        alignItems: "center",
        paddingTop: 40
    },
    btn_group_wrapper: {
        flexDirection: "row-reverse",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: VARIABLES.WHITE_COLOR,
        borderRadius: 10,
        padding: 5
    },
    btn_group: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    btn_group_active: {
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#777",
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 0.5,
        elevation: 3
    },
    btn_group_text: {
        fontFamily: "vazir",
        fontSize: 18,
        color: VARIABLES.PRIMARY_COLOR_DARK
    },
    title: {
        fontFamily: "vazir",
        fontSize: 18,
        paddingHorizontal: 5,
        marginTop: 15,
        textAlign: "right"
    },
    centering: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    divider: {
        height: 1,
        width: "100%",
        backgroundColor: VARIABLES.GRAY_COLOR_LIGHT,
        marginVertical: 5
    }
});

export default featuredStyles;