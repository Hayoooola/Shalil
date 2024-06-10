import { Dispatch, FC, SetStateAction } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../../features/styles';
import STATUS_FILTER from '../../../enums/status_filter';

interface IProps {
    activeFilter: STATUS_FILTER;
    setActiveFilter: Dispatch<SetStateAction<STATUS_FILTER>>;
}


// Provides status filter to accounts screen
const Filters: FC<IProps> = ({ activeFilter, setActiveFilter }) => {
    const { t } = useTranslation();

    return (
        <View style={featuredStyles.btn_group_wrapper}>

            {/* --------- All --------- */}
            <TouchableOpacity
                style={activeFilter === STATUS_FILTER.ALL ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                onPress={() => setActiveFilter(STATUS_FILTER.ALL)}
            >
                <Text style={featuredStyles.btn_group_text}>
                    {t("all")}
                </Text>
            </TouchableOpacity>

            {/* --------- Debtor --------- */}
            <TouchableOpacity
                style={activeFilter === STATUS_FILTER.DEBTOR ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                onPress={() => setActiveFilter(STATUS_FILTER.DEBTOR)}
            >
                <Text style={featuredStyles.btn_group_text}>
                    {t("debtor")}
                </Text>
            </TouchableOpacity>

            {/* --------- Creditor --------- */}
            <TouchableOpacity
                style={activeFilter === STATUS_FILTER.CREDITOR ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                onPress={() => setActiveFilter(STATUS_FILTER.CREDITOR)}
            >
                <Text style={featuredStyles.btn_group_text}>
                    {t("creditor")}
                </Text>
            </TouchableOpacity>

        </View>
    );
};
export default Filters;
const styles = StyleSheet.create({});