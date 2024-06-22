import { Dispatch, FC, SetStateAction } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../../features/styles';
import TRANSACTIONS_FILTER from '../../../enums/transactions_filter';

interface IProps {
    activeFilter: TRANSACTIONS_FILTER;
    setActiveFilter: Dispatch<SetStateAction<TRANSACTIONS_FILTER>>;
}


// Provides status filter to transactions screen
const Filters: FC<IProps> = ({ activeFilter, setActiveFilter }) => {
    const { t } = useTranslation();

    return (
        <View style={featuredStyles.btn_group_wrapper}>

            {/* --------- All --------- */}
            <TouchableOpacity
                style={activeFilter === TRANSACTIONS_FILTER.ALL ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                onPress={() => setActiveFilter(TRANSACTIONS_FILTER.ALL)}
            >
                <Text style={featuredStyles.btn_group_text}>
                    {t("all")}
                </Text>
            </TouchableOpacity>

            {/* --------- PAY --------- */}
            <TouchableOpacity
                style={activeFilter === TRANSACTIONS_FILTER.PAY ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                onPress={() => setActiveFilter(TRANSACTIONS_FILTER.PAY)}
            >
                <Text style={featuredStyles.btn_group_text}>
                    {t("pay")}
                </Text>
            </TouchableOpacity>

            {/* --------- RECEIPT --------- */}
            <TouchableOpacity
                style={activeFilter === TRANSACTIONS_FILTER.RECEIPT ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                onPress={() => setActiveFilter(TRANSACTIONS_FILTER.RECEIPT)}
            >
                <Text style={featuredStyles.btn_group_text}>
                    {t("receipt")}
                </Text>
            </TouchableOpacity>

        </View>
    );
};
export default Filters;
const styles = StyleSheet.create({});