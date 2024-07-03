import { FC } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../../features/styles';
import { deleteAccount } from '../../../store/reducers/accounts';
import IAccount from '../../../interfaces/accounts';
import VARIABLES from '../../../enums/variables';
import { deleteAccountsTransaction } from '../../../store/reducers/transactions';

interface IProps {
    accountData: IAccount;
}


// Handle delete Account in create_Account screen
const DeleteAccount: FC<IProps> = ({ accountData }) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const navigate = useNavigation<any>();

    // Handle delete an Account
    const handleDeleteAccount = async () => {
        try {
            // @ts-ignore
            await dispatch(deleteAccount(accountData));

            // @ts-ignore
            await dispatch(deleteAccountsTransaction(accountData.id));

            // Show success toast
            Toast.show({
                type: "success",
                text2: t("delete_account_success")
            });

            // Navigate to Accounts screen
            navigate.navigate(t("accounts"));

        } catch (err) {
            Toast.show({
                type: "error",
                text2: t("delete_account_failed")
            });
        }

    };

    // Handle delete modal
    const handleOpenDeleteModal = () => {
        Alert.alert(
            t("delete_account_alert"),
            t("delete_account_message"), [
            {
                text: "حذف کامل حساب",
                onPress: handleDeleteAccount,
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
                    {t("delete_account")}
                </Text>
                <MaterialIcons name="delete" size={24} color={VARIABLES.RED_COLOR} />
            </View>
        </TouchableOpacity>
    );
};
export default DeleteAccount;

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