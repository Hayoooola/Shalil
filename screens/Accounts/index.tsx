import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../features/styles';
import Filters from './filters';
import CreateNewAccountBtn from '../Dashboard/review/add_account_btn';
import SingleCard from '../Dashboard/review/single-card';
import { fetchProjects } from '../../store/reducers/projects';
import IStore from '../../interfaces/store';
import IProject from '../../interfaces/projects';
import MainLoading from '../../components/Loading';
import STATUS_FILTER from '../../enums/status_filter';
import VARIABLES from '../../enums/variables';
import CustomText from '../../components/Text';


const AccountsScreen = () => {
    const [activeFilter, setActiveFilter] = useState(STATUS_FILTER.ALL);
    const [activeProjects, setActiveProjects] = useState<IProject[]>([]);

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const { data: allProjects, error, loading } = useSelector((store: IStore) => store.projects);

    // Fetch All projects
    useFocusEffect(
        useCallback(() => {
            // @ts-ignore
            dispatch(fetchProjects());
        }, [])
    );

    // Update initial Projects to show
    useMemo(() => {
        allProjects.length && setActiveProjects(allProjects);
    }, [allProjects]);

    // Handle show error toast in case of Un-Successful loading projects
    useMemo(() => {
        error && Toast.show({
            type: "error",
            text2: t("failed_to_load_data")
        });
    }, [error]);


    // Handle update activeProjects by changing filters
    useMemo(() => {
        switch (activeFilter) {
            case STATUS_FILTER.CREDITOR:
                return setActiveProjects(allProjects.filter(project => project.total > 0));
            case STATUS_FILTER.DEBTOR:
                return setActiveProjects(allProjects.filter(project => project.total < 0));
            default:
                return setActiveProjects(allProjects);
        }
    }, [activeFilter]);


    return (
        <View style={featuredStyles.screen_container}>

            {/* ---------- Status filter ---------- */}
            <Filters
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            {/* ---------- Accounts review ---------- */}
            {loading ? (
                <MainLoading />
            ) : (
                <ScrollView style={styles.accountsWrapper}>

                    {activeProjects.length ? (
                        activeProjects.map((projectData, index) => (
                            <View key={index} style={styles.card_wrapper}>
                                <SingleCard projectData={projectData} />
                            </View>
                        ))
                    ) : activeFilter !== STATUS_FILTER.ALL ? (
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

            {/* Create a new Account btn */}
            <View style={styles.create_new_account_container}>
                <CreateNewAccountBtn />
            </View>

        </View>
    );
};
export default AccountsScreen;

const styles = StyleSheet.create({
    create_new_account_container: {
        height: 80,
        minWidth: "100%"
    },
    accountsWrapper: {
        flex: 1,
    },
    card_wrapper: {
        backgroundColor: VARIABLES.WHITE_COLOR,
        borderRadius: 15,
        minWidth: "100%",
        marginTop: 10
    }
});