import { Fragment, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../features/styles';
import Filters from './filters';
import CreateNewTransactionBtn from './add_new_transaction_btn';
import SingleTransaction from './single_transaction';
import CustomText from '../../components/Text';
import MainDivider from '../../components/Divider';
import { fetchTransactions } from '../../store/reducers/transactions';
import { sortTransactions } from '../../features/sort';
import IStore from '../../interfaces/store';
import ITransaction from '../../interfaces/transactions';
import MainLoading from '../../components/Loading';
import TRANSACTIONS_FILTER from '../../enums/transactions_filter';
import VARIABLES from '../../enums/variables';
import TRANSACTION_TYPE from '../../enums/transaction_type';


const TransactionsScreen = () => {
    const [activeFilter, setActiveFilter] = useState(TRANSACTIONS_FILTER.ALL);
    const [activeTransactions, setActiveTransactions] = useState<ITransaction[]>([]);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const { data: allTransactions, error, loading } = useSelector((store: IStore) => store.transactions);

    // Fetch All Transactions
    useFocusEffect(
        useCallback(() => {
            // @ts-ignore
            dispatch(fetchTransactions());
        }, [])
    );

    // Update initial Transactions to show
    useMemo(() => {
        allTransactions && setActiveTransactions(sortTransactions(allTransactions));
    }, [allTransactions]);

    // Handle show error toast in case of Un-Successful loading Transactions
    useMemo(() => {
        error && Toast.show({
            type: "error",
            text2: t("failed_to_load_data")
        });
    }, [error]);


    // Handle update activeTransactions by changing filters
    useMemo(() => {
        switch (activeFilter) {
            case TRANSACTIONS_FILTER.PAY:
                return setActiveTransactions(allTransactions.filter(Transaction => Transaction.type === TRANSACTION_TYPE.PAY));
            case TRANSACTIONS_FILTER.RECEIPT:
                return setActiveTransactions(allTransactions.filter(Transaction => Transaction.type === TRANSACTION_TYPE.RECEIPT));
            default:
                return setActiveTransactions(allTransactions);
        }
    }, [activeFilter]);


    return (
        <View style={featuredStyles.screen_container}>

            {/* ---------- Status filter ---------- */}
            <Filters
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            {/* ---------- Transactions review ---------- */}
            {loading ? (
                <MainLoading />
            ) : (
                <ScrollView style={styles.wrapper}>

                    {activeTransactions.length ? (
                        activeTransactions.map((item, index) => (
                            <Fragment key={index}>
                                <SingleTransaction transaction={item} />
                                <MainDivider />
                            </Fragment>
                        ))
                    ) : activeFilter !== TRANSACTIONS_FILTER.ALL ? (
                        <View style={styles.filter_text}>
                            <CustomText>
                                {t("transaction_not_found_by_filter")}
                            </CustomText>
                        </View>
                    ) : (
                        <View style={styles.filter_text}>
                            <CustomText>
                                {t("transaction_not_found")}
                            </CustomText>
                        </View>
                    )}

                </ScrollView>
            )}

            {/* Create a new transaction btn */}
            <View style={styles.create_new_transaction_container}>
                <CreateNewTransactionBtn />
            </View>

        </View>
    );
};
export default TransactionsScreen;

const styles = StyleSheet.create({
    create_new_transaction_container: {
        height: 80,
        minWidth: "100%"
    },
    transactionsWrapper: {
        flex: 1,
    },
    wrapper: {
        backgroundColor: VARIABLES.WHITE_COLOR,
        borderRadius: 15,
        width: "100%",
        marginTop: 10
    },
    filter_text: {
        paddingTop: 20,
        alignItems: "center"
    }
});