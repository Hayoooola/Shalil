import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../features/styles';
import Filters from './filters';
import CreateNewTransactionBtn from './add_new_transaction_btn';
import SingleCard from '../Dashboard/review/single-card';
import CustomText from '../../components/Text';
import { fetchAccounts } from '../../store/reducers/projects';
import IStore from '../../interfaces/store';
import IAccount from '../../interfaces/projects';
import MainLoading from '../../components/Loading';
import TRANSACTIONS_FILTER from '../../enums/transactions_filter';
import VARIABLES from '../../enums/variables';


const TransactionsScreen = () => {
    const [activeFilter, setActiveFilter] = useState(TRANSACTIONS_FILTER.ALL);
    const [activeTransactions, setActiveTransactions] = useState<IAccount[]>([]);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const { data: allProjects, error, loading } = useSelector((store: IStore) => store.projects);

    // Fetch All projects
    useFocusEffect(
        useCallback(() => {
            // @ts-ignore
            dispatch(fetchAccounts());
        }, [])
    );

    // Update initial Projects to show
    useMemo(() => {
        allProjects.length && setActiveTransactions(allProjects);
    }, [allProjects]);

    // Handle show error toast in case of Un-Successful loading projects
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
                return setActiveTransactions(allProjects.filter(project => project.total > 0));
            case TRANSACTIONS_FILTER.RECEIPT:
                return setActiveTransactions(allProjects.filter(project => project.total < 0));
            default:
                return setActiveTransactions(allProjects);
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
                <ScrollView style={styles.transactionsWrapper}>

                    {activeTransactions.length ? (
                        activeTransactions.map((projectData, index) => (
                            <View key={index} style={styles.card_wrapper}>
                                <SingleCard projectData={projectData} />
                            </View>
                        ))
                    ) : activeFilter !== TRANSACTIONS_FILTER.ALL ? (
                        <View style={{ paddingTop: 20 }}>
                            <CustomText>
                                {t("project_not_found_by_filter")}
                            </CustomText>
                        </View>
                    ) : (
                        <View style={{ paddingTop: 20 }}>
                            <CustomText>
                                {t("project_not_found")}
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
    card_wrapper: {
        backgroundColor: VARIABLES.WHITE_COLOR,
        borderRadius: 15,
        minWidth: "100%",
        marginTop: 10
    }
});