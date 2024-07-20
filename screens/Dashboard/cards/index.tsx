import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import MainCard from '../../../components/Card';
import { fetchTotalMonth, totalInitialValue } from '../../../store/reducers/total';
import IStore from '../../../interfaces/store';
import ITotal from '../../../interfaces/total';
import VARIABLES from '../../../enums/variables';


// Provides Cards in Dashboard screen
const Cards = () => {
    const [totalMonth, setTotalMonth] = useState<ITotal>(totalInitialValue);

    const { data } = useSelector((store: IStore) => store.totalMonth);

    const { t } = useTranslation();

    const dispatch = useDispatch();

    // fetch all month values
    useFocusEffect(useCallback(() => {
        // @ts-ignored
        dispatch(fetchTotalMonth());
    }, []));


    // Handle Update total month
    useMemo(() => {
        data && setTotalMonth({
            pay: data.pay,
            receipt: data.receipt,
            total: data.total
        });
    }, [data]);



    return (
        <View style={styles.container}>

            {/* --------- Income --------- */}
            <MainCard
                color={VARIABLES.SECONDARY_COLOR_DARK}
                fontSize={15}
                header={t("month_income")}
                content={`${totalMonth.receipt ? "+" : ""} ${(totalMonth.receipt).toLocaleString("fa")}`}
            />

            {/* --------- Total --------- */}
            <MainCard
                color={VARIABLES.PRIMARY_COLOR_DARK}
                fontSize={17}
                header={t("month_total")}
                content={`${(totalMonth.total).toLocaleString("fa")}`}
            />

            {/* --------- Outcome --------- */}
            <MainCard
                color={VARIABLES.RED_COLOR}
                fontSize={15}
                header={t("month_outcome")}
                content={`${totalMonth.pay ? "-" : ""} ${(totalMonth.pay).toLocaleString("fa")}`}
            />

        </View>
    );
};
export default Cards;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 7,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15
    }
});