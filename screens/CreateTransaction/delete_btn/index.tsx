import { FC } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../../features/styles';
import { deleteTransaction } from '../../../store/reducers/transactions';
import { updateAccountsByDeleteTransaction } from '../../../store/reducers/accounts';
import ITransaction from '../../../interfaces/transactions';
import VARIABLES from '../../../enums/variables';

interface IProps {
    transaction: ITransaction;
}


// Handle delete transaction in create_transaction screen
const DeleteTransaction: FC<IProps> = ({ transaction }) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const navigate = useNavigation<any>();

    // Handle delete a transaction
    const handleDeleteTransaction = async () => {
        try {
            // @ts-ignore
            await dispatch(deleteTransaction(transaction?.id));

            // update account
            // @ts-ignore
            await dispatch(updateAccountsByDeleteTransaction(transaction));

            // Show success toast
            Toast.show({
                type: "success",
                text2: t("delete_transaction_success")
            });

            // Navigate to transactions screen
            navigate.navigate(t("transactions"));

        } catch (err) {
            Toast.show({
                type: "error",
                text2: t("delete_transaction_failed")
            });
        }

    };

    // Handle delete modal
    const handleOpenDeleteModal = () => {
        Alert.alert(
            t("delete_transaction_alert"),
            t("delete_transaction_message"), [
            {
                text: "حذف کامل تراکنش",
                onPress: handleDeleteTransaction,
                style: "default"
            },
            {
                text: "انصراف",
                style: "cancel"
            }
        ],
            {
                cancelable: true,
            });
    };


    return (
        <TouchableOpacity onPress={handleOpenDeleteModal}>
            <View style={styles.container}>
                <Text style={[featuredStyles.text, { color: VARIABLES.RED_COLOR }]}>
                    {t("delete_transaction")}
                </Text>
                <MaterialIcons name="delete" size={24} color={VARIABLES.RED_COLOR} />
            </View>
        </TouchableOpacity>
    );
};
export default DeleteTransaction;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        paddingBottom: 20
    }
});