import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import VARIABLES from '../../enums/variables';

interface IProps {
    header: string;
    content: string;
    color: string,
    fontSize?: number;
}


const MainCard: FC<IProps> = ({ header, content, color, fontSize = 18 }) => {
    return (
        <View style={styles.container}>

            {/* ---------- Header -------- */}
            <View style={{ ...styles.header, borderBlockColor: color }}>
                <Text style={{ fontSize, color, fontFamily: "vazir", textAlign: "center" }}>
                    {header}
                </Text>
            </View>

            {/* ---------- Content -------- */}
            <View style={styles.content}>
                <Text style={{ fontSize, color, fontFamily: "vazir", textAlign: "center" }}>
                    {content}
                </Text>
            </View>

        </View>
    );
};
export default MainCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: VARIABLES.WHITE_COLOR,
        borderRadius: 15,
        height: 72,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        height: 32,
        width: "100%",
        borderBottomWidth: 1,
        marginTop: -4,
        paddingBottom: 4,
    },
    content: {
        width: "100%",
        paddingTop: 5
    }
});