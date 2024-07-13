import { Image, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import moment from 'moment-jalaali';

const chartSrc = require("../../../assets/images/chart.png");


// Provides main chart in Dashboard view
const Chart = () => {
    const { t } = useTranslation();

    const persianDate = moment().locale("fa-IR").format('jD jMMMM jYYYY');


    return (
        <View style={styles.container}>

            {/* -------------- Today text -------------- */}
            <Text style={styles.text}>
                {`${t("today")} ${persianDate}`}
            </Text>

            {/* -------------- Chart -------------- */}
            <Image
                source={chartSrc}
                style={styles.chart}
            />

        </View>
    );
};
export default Chart;

const styles = StyleSheet.create({
    container: {
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 26,
        fontFamily: "vazir",
    },
    chart: {
        width: 144,
        height: 145
    }
});