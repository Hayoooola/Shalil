import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import moment from 'moment-jalaali';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import * as FileSystem from 'expo-file-system';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddReceiptImage from './add_receipt_image';
import SelectAccount from './select_account';
import SelectDate from './select_date';
import MainActionButton from '../../components/ActionButton';
import DeleteTransaction from './delete_btn';
import { fetchAccounts } from '../../store/reducers/accounts';
import { createNewTransaction, editTransaction } from '../../store/reducers/transactions';
import featuredStyles from '../../features/styles';
import handleConvertToNumber from '../../features/convert_to_number';
import ITransaction, { IAccountInTransaction } from '../../interfaces/transactions';
import IStore from '../../interfaces/store';
import IAccount from '../../interfaces/accounts';
import TRANSACTION_TYPE from '../../enums/transaction_type';
import VARIABLES from '../../enums/variables';
import ACCOUNT_TYPE from '../../enums/account_type';


// Provides Create new Transaction page
const CreateTransactionScreen = ({ route }) => {
    const [value, setValue] = useState("");
    const [transactionType, setTransactionType] = useState(TRANSACTION_TYPE.PAY);
    const [account, setAccount] = useState<IAccountInTransaction | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [note, setNote] = useState("");
    const [date, setDate] = useState(moment(new Date()).locale("fa-IR").format("jYYYY/jMM/jDD_HH:mm"));
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    const navigation = useNavigation<any>();

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const createAccountObject: IAccount = {
        id: "-1",
        account_type: ACCOUNT_TYPE.PERSONAL,
        date_of_create: moment(new Date()).locale("fa-IR").format("jYYYY/jMM/jDD_HH:mm"),
        imageUri: null,
        last_update: date,
        note: "",
        title: t("add_account"),
        total: 0
    };

    const params = route.params;
    const currentTransaction: ITransaction | undefined = params ? params.currentTransaction : undefined;
    const accountData: IAccount | undefined = params ? params.accountData : undefined;

    const { data: allAccount, error } = useSelector((store: IStore) => store.accounts);

    // Fetch All Accounts
    useFocusEffect(
        useCallback(() => {
            // @ts-ignore
            dispatch(fetchAccounts());
        }, [])
    );

    // Update Accounts to show
    useMemo(() => {
        allAccount.length ?
            setAccounts([...allAccount, createAccountObject]) :
            setAccounts([createAccountObject]);
    }, [allAccount]);

    // Update update initial transaction info in case of updating a transaction
    useMemo(() => {
        if (currentTransaction) {
            setValue((currentTransaction.value || 0).toLocaleString());
            setTransactionType(currentTransaction.type);
            setDate(currentTransaction.last_update);
            setImageUri(currentTransaction.imageUri);
            setNote(currentTransaction.note);
        }

        (currentTransaction && allAccount) && setAccount(currentTransaction.account);
        (accountData && allAccount) && setAccount(accountData);
    }, [currentTransaction, allAccount, accountData]);

    // Handle show error toast in case of Un-Successful loading Accounts
    useMemo(() => {
        error && Toast.show({
            type: "error",
            text2: t("failed_to_load_data")
        });
    }, [error]);


    // Handle check data for completeness
    const handleCheckDataCompleteness = () => {
        if (!value) {
            Toast.show({
                type: "error",
                text2: t("transaction_value_error")
            });
            return false;
        } else if (!account) {
            Toast.show({
                type: "error",
                text2: t("transaction_account_error")
            });
            return false;

        } else {
            return true;
        }
    };


    // Handle update account detail by adding transaction
    const handleUpdateAccount = async () => {
        const selectedAccount = accounts.find(item => item.id === account.id);

        const prevAccountTotal = selectedAccount.total || 0;
        const inputValue = handleConvertToNumber(value);

        // Update total value to be calculated in account_total (it is useful in case of updating a transaction)
        const updatedPrevTotal: number = currentTransaction ?
            currentTransaction.type === TRANSACTION_TYPE.RECEIPT ?
                (prevAccountTotal - Number(currentTransaction.value)) :
                (prevAccountTotal + Number(currentTransaction.value)) :
            prevAccountTotal;

        const UpdateAccountTotal = transactionType === TRANSACTION_TYPE.PAY ?
            Number(updatedPrevTotal - inputValue) :
            Number(updatedPrevTotal + inputValue);

        const updatedAccount: IAccount = {
            ...selectedAccount,
            last_update: moment(new Date()).locale("fa-IR").format("jYYYY/jMM/jDD_HH:mm"),
            total: UpdateAccountTotal,
        };

        const newAccounts = accounts
            .filter(item => (item.id !== account.id) && (item.id !== createAccountObject.id))
            .concat(updatedAccount);

        await AsyncStorage.setItem("accounts", JSON.stringify(newAccounts));
    };


    // Handle Create a new Transaction
    const handleSubmit = async () => {

        if (handleCheckDataCompleteness()) {
            const now = moment(new Date()).locale("fa-IR").format("jYYYY/jMM/jDD_HH:mm");

            const newTransaction: ITransaction = {
                id: currentTransaction ? currentTransaction.id : uuid.v4(),
                type: transactionType,
                value: handleConvertToNumber(value),
                account,
                note: note.trim(),
                imageUri: null,
                date_of_create: currentTransaction ? currentTransaction.date_of_create : now,
                last_update: date
            };


            // Replace ImageUri in case of select an image by user
            if (imageUri) {
                try {
                    // Detect format
                    const format = imageUri.split(".")[imageUri.split(".").length - 1];

                    // Generate a unique filename
                    const filename = `${new Date()}.${format}`;

                    // Get a writeable directory on the device
                    const directory = await FileSystem.documentDirectory;

                    const newImageUri = `${directory}${filename}`;

                    // Move the captured image to the writeable directory
                    await FileSystem.moveAsync({
                        from: imageUri,
                        to: newImageUri,
                    });

                    // Replace new ImageUri
                    newTransaction.imageUri = newImageUri;

                } catch (err) {
                    // Show alert to user
                    alert(t("select_image_error_message"));
                }
            }


            // Storing data using AsyncStorage
            try {

                // Handle Create/Update transaction
                // @ts-ignore
                currentTransaction ? dispatch(editTransaction(newTransaction)) : dispatch(createNewTransaction(newTransaction));

                // Show Success toast
                Toast.show({
                    type: 'success',
                    text2: currentTransaction ? t("edit_transaction_success_message") : t("create_transaction_success_message")
                });

                // Update account detail
                await handleUpdateAccount();

                // Redirect user to Transaction page
                accountData ? navigation.navigate(t("account_detail"), { accountData }) : navigation.navigate(t("transactions"));

            } catch (err) {

                // Show alert to user
                alert(t("create_transaction_error_message"));
            }
        }
    };

    // Handle change input
    const handleChange = (text) => {
        if (text) {
            // Parse the input to a number
            const numberValue = parseFloat(text.replace(/,/g, ''));

            // Format the number with thousand separator
            const formattedValue = numberValue.toLocaleString();

            setValue(formattedValue);
        } else {

            setValue("");
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                {/* -------------- Value -------------- */}
                <Text style={featuredStyles.title}>
                    {`${t("value")} (${t("currency")})`}
                </Text>
                <TextInput
                    style={featuredStyles.input}
                    inputMode="numeric"
                    value={value}
                    onChangeText={handleChange}
                    placeholderTextColor={VARIABLES.GRAY_COLOR}
                />

                {/* -------------- Transaction type -------------- */}
                <Text style={featuredStyles.title}>
                    {t("transaction_type")}
                </Text>
                <View style={featuredStyles.btn_group_wrapper}>

                    {/* Personal */}
                    <TouchableOpacity
                        style={transactionType === TRANSACTION_TYPE.PAY ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                        onPress={() => setTransactionType(TRANSACTION_TYPE.PAY)}
                    >
                        <Text style={featuredStyles.btn_group_text}>
                            {t("pay")}
                        </Text>
                    </TouchableOpacity>

                    {/* Shared */}
                    <TouchableOpacity
                        style={transactionType === TRANSACTION_TYPE.RECEIPT ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                        onPress={() => setTransactionType(TRANSACTION_TYPE.RECEIPT)}
                    >
                        <Text style={featuredStyles.btn_group_text}>
                            {t("receipt")}
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* -------------- Select_Account -------------- */}
                <Text style={featuredStyles.title}>
                    {t("select_account")}
                </Text>
                <SelectAccount account={account} setAccount={setAccount} accounts={accounts} />

                {/* -------------- Date picker -------------- */}
                <Text style={featuredStyles.title}>
                    {t("select_date")}
                </Text>
                <SelectDate date={date} setDate={setDate} />

                {/* -------------- Note -------------- */}
                <Text style={featuredStyles.title}>
                    {t("note")}
                </Text>
                <TextInput
                    style={[featuredStyles.input, styles.note]}
                    value={note}
                    onChangeText={setNote}
                />

                {/* -------------- Add_Receipt_image -------------- */}
                <AddReceiptImage imageUri={imageUri} setImageUri={setImageUri} />

                {/* -------------- Finish Button -------------- */}
                <MainActionButton
                    text={currentTransaction ? t("submit_changes") : t("add")}
                    type='primary'
                    icon={currentTransaction ? null : <Entypo name="plus" size={22} color={VARIABLES.WHITE_COLOR} />}
                    onPress={handleSubmit}
                />

                {/* -------------- Delete Button -------------- */}
                {currentTransaction ? (
                    <DeleteTransaction transaction={currentTransaction} />
                ) : null}

            </ScrollView>
        </View>
    );
};
export default CreateTransactionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingBottom: 20
    },
    note: {
        height: 96
    },
    create_new_Transaction_container: {
        marginTop: 20,
        marginBottom: 10,
    },
    create_new_Transaction: {
        flex: 1,
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        paddingVertical: 10,
    },
    add_new_text: {
        fontFamily: "vazir",
        fontSize: 16,
        color: "#fff"
    }
});