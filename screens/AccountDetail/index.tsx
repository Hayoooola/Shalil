import { Fragment, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import AntDesign from '@expo/vector-icons/AntDesign';

import featuredStyles from '../../features/styles';
import Filters from '../Transactions/filters';
import CreateNewTransactionBtn from '../Transactions/add_new_transaction_btn';
import SingleTransaction from '../Transactions/single_transaction';
import CustomText from '../../components/Text';
import MainDivider from '../../components/Divider';
import MainLoading from '../../components/Loading';
import { fetchTransactions } from '../../store/reducers/transactions';
import { sortTransactions } from '../../features/sort';
import IStore from '../../interfaces/store';
import ITransaction from '../../interfaces/transactions';
import IAccount from '../../interfaces/accounts';
import TRANSACTIONS_FILTER from '../../enums/transactions_filter';
import VARIABLES from '../../enums/variables';
import TRANSACTION_TYPE from '../../enums/transaction_type';
import DeleteAccount from './delete_btn';


const AccountDetailScreen = ({ route }) => {
    const [activeFilter, setActiveFilter] = useState(TRANSACTIONS_FILTER.ALL);
    const [activeTransactions, setActiveTransactions] = useState<ITransaction[]>([]);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const { data: allTransactions, error, loading } = useSelector((store: IStore) => store.transactions);

    const navigate = useNavigation();

    const params = route.params;
    const accountData: IAccount | undefined = params ? params.accountData : undefined;

    // Fetch All Transactions
    useFocusEffect(
        useCallback(() => {
            // @ts-ignore
            accountData && dispatch(fetchTransactions(accountData.id));
        }, [accountData])
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


    // Handle click on edit_account btn
    // @ts-ignore
    const handleEditAccount = () => navigate.navigate(t("add_account"), { currentAccount: accountData });


    return (
        <View style={[featuredStyles.screen_container, { paddingTop: 20 }]}>

            {/* ---------- Status filter ---------- */}
            <Filters
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            {/* ---------- Accounts review ---------- */}
            {loading ? (
                <MainLoading />
            ) : (
                <ScrollView style={styles.wrapper}>

                    {activeTransactions.length ? (
                        activeTransactions.map((item, index) => (
                            <Fragment key={index}>
                                <SingleTransaction
                                    transaction={item}
                                    accountData={accountData}
                                />
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

            {/* Account_btn */}
            <View style={styles.action_btn_wrapper}>

                {/* Edit_account */}
                <TouchableOpacity onPress={handleEditAccount}>
                    <View style={styles.edit_account_container}>
                        <Text style={[featuredStyles.text, { color: VARIABLES.WARNING }]}>
                            {t("edit_account")}
                        </Text>
                        <AntDesign name="edit" size={26} color={VARIABLES.WARNING} />
                    </View>
                </TouchableOpacity>

                {/* Delete_account */}
                <DeleteAccount accountData={accountData} />

            </View>

            {/* Create a new transaction btn */}
            <View style={styles.create_new_transaction_container}>
                <CreateNewTransactionBtn accountData={accountData} />
            </View>

        </View>
    );
};
export default AccountDetailScreen;

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
    },
    edit_account_container: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    action_btn_wrapper: {
        marginTop: 10,
        marginBottom: -20,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        alignItems: "center",
        width: "100%"
    }
});