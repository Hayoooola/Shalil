import { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../../../features/styles';
import IAccount from '../../../../interfaces/accounts';
import VARIABLES from '../../../../enums/variables';
import ACCOUNT_TYPE from '../../../../enums/account_type';

interface IProps {
    accountData: IAccount;
}


// Provides single-account to review section in Dashboard view
const SingleCard: FC<IProps> = ({ accountData }) => {
    const { t } = useTranslation();

    const navigate = useNavigation<any>();

    // Handle find total Style
    const handleTotalStyle = () => (
        accountData.total > 0 ? (styles.total_creditor) :
            accountData.total < 0 ? (styles.total_debtor) :
                styles.total_cleared
    );

    // Handle calculate and show total
    const handleCalculateTotal = () => (
        accountData.total > 0 ? (`${(accountData.total).toLocaleString("fa")} ${t("currency")} +`) :
            accountData.total < 0 ? (`${(Math.abs(accountData.total)).toLocaleString("fa")} ${t("currency")} -`) :
                t("square")
    );

    // Handle Click on Action btn
    const handleClick = () => navigate.navigate(t("account_detail"), { accountData });


    return (
        <TouchableOpacity onPress={handleClick}>
            <View style={styles.container}>
                <View style={styles.wrapper}>

                    {/* -------- Account-Avatar -------- */}
                    <View style={[styles.avatar_wrapper, featuredStyles.shadow]}>
                        {accountData.imageUri ? (
                            <Image source={{ uri: accountData.imageUri }} width={40} height={40} borderRadius={10} />
                        ) : (
                            accountData.account_type === ACCOUNT_TYPE.PERSONAL ? (
                                <FontAwesome name="credit-card" size={22} color="white" />
                            ) : (
                                <MaterialCommunityIcons name="account-multiple-plus" size={32} color="white" />
                            )
                        )}
                    </View>

                    {/* -------- Content -------- */}
                    <View style={{ flex: 1 }}>

                        {/* Title */}
                        <Text style={[styles.text, styles.title]} numberOfLines={2}>
                            {accountData.title}
                        </Text>

                        {/* Account + Action_btn */}
                        <View style={styles.total_wrapper}>
                            {/* Total */}
                            <Text style={[styles.text, styles.total, handleTotalStyle()]}>
                                {handleCalculateTotal()}
                            </Text>
                            {/* Action_btn */}
                            <TouchableOpacity onPress={handleClick}>
                                <AntDesign name="linechart" size={24} color={VARIABLES.PRIMARY_COLOR_DARK} />
                            </TouchableOpacity>
                        </View>

                        {/* Date */}
                        <Text style={[styles.text, styles.date]}>
                            {accountData.last_update}
                        </Text>

                    </View>

                </View>
            </View>
        </TouchableOpacity>
    );
};
export default SingleCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        paddingTop: 5
    },
    wrapper: {
        flex: 1,
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 15,
    },
    avatar_wrapper: {
        width: 40,
        height: 40,
        backgroundColor: VARIABLES.SECONDARY_COLOR,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontFamily: "vazir",
        textAlign: "right"
    },
    title: {
        fontSize: 18,
    },
    total: {
        fontSize: 18,
        color: VARIABLES.SECONDARY_COLOR_DARK
    },
    total_cleared: {
        color: VARIABLES.PRIMARY_COLOR_DARK,
        fontSize: 15,
    },
    total_debtor: {
        color: VARIABLES.RED_COLOR
    },
    total_creditor: {
        color: VARIABLES.SECONDARY_COLOR_DARK
    },
    date: {
        fontSize: 13,
        color: VARIABLES.BLACK_COLOR,
        textAlign: "left"
    },
    total_wrapper: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        gap: 10,
    }
});