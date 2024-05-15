import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import MainCard from '../../../components/Card';
import VARIABLES from '../../../enums/variables';


// Provides Cards in Dashboard screen
const Cards = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>

            {/* --------- Outcome --------- */}
            <MainCard
                color={VARIABLES.SECONDARY_COLOR_DARK}
                fontSize={16}
                header={t("month_income")}
                content={(6010000).toLocaleString("fa")}
            />

            {/* --------- Total --------- */}
            <MainCard
                color={VARIABLES.PRIMARY_COLOR_DARK}
                fontSize={18}
                header={t("month_total")}
                content={(160000000).toLocaleString("fa")}
            />

            {/* --------- Income --------- */}
            <MainCard
                color={VARIABLES.RED_COLOR}
                fontSize={16}
                header={t("month_outcome")}
                content={(6800000).toLocaleString("fa")}
            />

        </View>
    );
};
export default Cards;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15
    }
});