import { Image, StyleSheet, Text, View } from 'react-native';
import moment from 'jalali-moment';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import featuredStyles from '../../../../features/styles';
import VARIABLES from '../../../../enums/variables';


// Provides single-account to review section in Dashboard view
const SingleCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>

                {/* -------- Project-Avatar -------- */}
                <View style={[styles.avatar_wrapper, featuredStyles.shadow]}>
                    <FontAwesome name="credit-card" size={22} color="white" />
                    {/* <Image source={{ uri: "file:///data/user/0/host.exp.exponent/files/1716098582029.jpeg" }} width={40} height={40} borderRadius={10} /> */}
                </View>

                {/* -------- Content -------- */}
                <View style={{ flex: 1 }}>

                    {/* Title */}
                    <Text style={[styles.text, styles.title]} numberOfLines={2}>
                        خرید لوازم ماشین
                    </Text>

                    {/* Total */}
                    <Text style={[styles.text, styles.total]}>
                        {`+ ${(98000).toLocaleString("fa")} تومان`}
                    </Text>

                    {/* Date */}
                    <Text style={[styles.text, styles.date]}>
                        {moment().locale("fa-IR").format('jYYYY/jMM/jD - HH:mm')}
                    </Text>

                </View>

            </View>
        </View>
    );
};
export default SingleCard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        paddingTop: 5
    },
    wrapper: {
        flex: 1,
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 15,
        borderBottomWidth: 1,
        borderBlockColor: VARIABLES.SECONDARY_COLOR
    },
    avatar_wrapper: {
        width: 40,
        height: 40,
        backgroundColor: VARIABLES.SECONDARY_COLOR,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontFamily: "vazir",
        textAlign: "right"
    },
    title: {
        fontSize: 20,
    },
    total: {
        fontSize: 18,
        color: VARIABLES.SECONDARY_COLOR_DARK
    },
    date: {
        fontSize: 13,
        color: VARIABLES.BLACK_COLOR,
        textAlign: "left"
    }
});