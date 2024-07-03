import { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../../features/styles';
import ITransaction from '../../../interfaces/transactions';
import IAccount from '../../../interfaces/accounts';
import VARIABLES from '../../../enums/variables';
import TRANSACTION_TYPE from '../../../enums/transaction_type';

interface IProps {
    transaction: ITransaction;
    accountData?: IAccount | undefined;
}


// Provides single transaction in transactions screen
const SingleTransaction: FC<IProps> = ({ transaction, accountData }) => {

    const { t } = useTranslation();

    const navigate = useNavigation<any>();

    // Handle calculate and show total
    const handleCalculateTotal = () => (
        transaction.type === TRANSACTION_TYPE.RECEIPT ?
            (`${(transaction.value || 0).toLocaleString("fa")} ${t("currency")} +`) :
            (`${(transaction.value || 0).toLocaleString("fa")} ${t("currency")} -`)
    );

    // Handle Click on Action btn
    const handleClick = () => navigate.navigate(t("add_transaction"), { currentTransaction: transaction, accountData });


    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>

                {/* -------- Transaction-Avatar -------- */}
                <View style={[styles.avatar_wrapper, featuredStyles.shadow]}>
                    {transaction.type === TRANSACTION_TYPE.PAY ? (
                        <Entypo name="emoji-neutral" size={26} color={VARIABLES.RED_COLOR} />
                    ) : (
                        <Entypo name="emoji-happy" size={26} color={VARIABLES.SECONDARY_COLOR_DARK} />
                    )}
                </View>

                {/* -------- Content -------- */}
                <View style={{ flex: 1 }}>

                    {/* Total */}
                    <Text style={[styles.text, styles.total]}>
                        {handleCalculateTotal()}
                    </Text>

                    {/* Account + Action_btn */}
                    <View style={styles.note_wrapper}>
                        {/* Account */}
                        <Text style={[styles.text, { fontSize: 16 }]}>
                            {`${transaction.type === TRANSACTION_TYPE.PAY ? t("from_account") : t("to_account")} ${transaction.account.title}`}
                        </Text>
                        {/* Action_btn */}
                        <TouchableOpacity onPress={handleClick}>
                            <AntDesign name="edit" size={26} color={VARIABLES.PRIMARY_COLOR_DARK} />
                        </TouchableOpacity>
                    </View>

                    {/* Note */}
                    {transaction.note ? (
                        <Text style={[styles.text, { opacity: 0.7, color: VARIABLES.PRIMARY_COLOR_DARK }]}>
                            {`_ ${transaction.note}`}
                        </Text>
                    ) : null}

                    {/* Date */}
                    <Text style={[styles.text, styles.date]}>
                        {transaction.last_update}
                    </Text>

                </View>

            </View>
        </View>
    );
};
export default SingleTransaction;

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
        backgroundColor: VARIABLES.WHITE_COLOR,
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
    },
    date: {
        fontSize: 13,
        color: VARIABLES.BLACK_COLOR,
        textAlign: "left"
    },
    note_wrapper: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        gap: 10,
    }
});