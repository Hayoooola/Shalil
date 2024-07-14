import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment-jalaali';
import { useFocusEffect } from '@react-navigation/native';

import { fetchTransactions } from '../../../store/reducers/transactions';
import featuredStyles from '../../../features/styles';
import ITransaction from '../../../interfaces/transactions';
import IStore from '../../../interfaces/store';
import TRANSACTION_TYPE from '../../../enums/transaction_type';
import VARIABLES from '../../../enums/variables';
import MainLoading from '../../../components/Loading';

// Handle calculate total
const handleCalculateTotal = (transactions: ITransaction[]) => {
    try {
        const payedArray = [...transactions]
            .filter(item => item.type === TRANSACTION_TYPE.PAY)
            .map(item => Number(item.value));

        const receiptArray = [...transactions]
            .filter(item => item.type === TRANSACTION_TYPE.RECEIPT)
            .map(item => Number(item.value));

        const totalPay = payedArray.reduce((a, b) => a + b, 0);
        const totalReceipt = receiptArray.reduce((a, b) => a + b, 0);

        return totalReceipt - totalPay;

    } catch {

        return 0;
    }
};



// Provides main chart in Dashboard view
const Chart = () => {
    const [total, setTotal] = useState(0);

    const { data, loading } = useSelector((store: IStore) => store.transactions);

    const { t } = useTranslation();

    const persianDate = moment().locale("fa-IR").format('jD jMMMM jYYYY');

    const dispatch = useDispatch();

    // Fetch all transactions
    useFocusEffect(useCallback(() => {
        // @ts-ignore
        dispatch(fetchTransactions());
    }, []));


    // Update payedTransactions & receiptTransactions
    useMemo(() => {
        data && setTotal(handleCalculateTotal(data));
    }, [data]);


    //  Handle find total color
    const handleFindColor = () => {
        if (total > 0) {
            return VARIABLES.SECONDARY_COLOR_DARK;
        } else if (total < 0) {
            return VARIABLES.RED_COLOR;
        } else {
            return VARIABLES.GRAY_COLOR_DARK;
        }
    };


    return (
        <View style={styles.container}>

            {/* -------------- Today text -------------- */}
            <Text style={[featuredStyles.text, styles.date]}>
                {`${t("today")} ${persianDate}`}
            </Text>

            {/* -------------- Total -------------- */}
            {loading ? (
                <MainLoading />
            ) : (
                <View style={styles.total_wrapper}>
                    <Text style={[featuredStyles.text, styles.total]}>
                        {`${t("total")}:`}
                    </Text>
                    <Text style={[featuredStyles.text, styles.total, { color: handleFindColor() }]}>
                        {total.toLocaleString("fa")}
                    </Text>
                    <Text style={[featuredStyles.text, styles.total]}>
                        {t("currency")}
                    </Text>
                </View>
            )}

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
    date: {
        fontSize: 25,
        color: VARIABLES.PRIMARY_COLOR_DARK
    },
    chart: {
        width: 144,
        height: 145
    },
    total_wrapper: {
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        gap: 6
    },
    total: {
        fontSize: 18,
        color: VARIABLES.GRAY_COLOR_DARK,
        marginTop: 20,
        marginBottom: -5
    }
});