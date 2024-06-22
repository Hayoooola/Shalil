import { useCallback, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import moment from 'jalali-moment';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';
import * as FileSystem from 'expo-file-system';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddReceiptImage from './add_receipt_image';
import SelectAccount from './select_account';
import MainDatePicker from '../../components/DatePicker';
import MainActionButton from '../../components/ActionButton';
import { fetchAccounts } from '../../store/reducers/projects';
import featuredStyles from '../../features/styles';
import ITransaction, { IAccountInTransaction } from '../../interfaces/transactions';
import IStore from '../../interfaces/store';
import IAccount from '../../interfaces/projects';
import TRANSACTION_TYPE from '../../enums/transaction_type';
import VARIABLES from '../../enums/variables';


// Provides Create new Transaction page
const CreateTransactionScreen = () => {
    const [value, setValue] = useState("");
    const [transactionType, setTransactionType] = useState(TRANSACTION_TYPE.PAY);
    const [account, setAccount] = useState<IAccountInTransaction | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [note, setNote] = useState("");
    const [date, setDate] = useState(moment(new Date()).locale("fa").format("YYYY/MM/DD"));
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    const navigation = useNavigation<any>();

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const { data: allAccount, error } = useSelector((store: IStore) => store.projects);

    // Fetch All Accounts
    useFocusEffect(
        useCallback(() => {
            // @ts-ignore
            dispatch(fetchAccounts());
        }, [])
    );

    // Update Accounts to show
    useMemo(() => {
        allAccount.length && setAccounts(allAccount);
    }, [allAccount]);

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


    // Handle update account detail
    const handleUpdateAccount = async () => {
        const selectedAccount = accounts.find(item => item.id === account.id);

        const prevAccountTotal = selectedAccount.total || 0;

        const UpdateAccountTotal = transactionType === TRANSACTION_TYPE.PAY ?
            Number(prevAccountTotal - (+value)) :
            Number(prevAccountTotal + (+value));

        const updatedAccount: IAccount = {
            ...selectedAccount,
            last_update: Date.now(),
            total: UpdateAccountTotal,
        };

        const newAccounts = accounts.filter(item => item.id !== account.id).concat(updatedAccount);

        await AsyncStorage.setItem("accounts", JSON.stringify(newAccounts));
    };


    // Handle Create a new Transaction
    const handleSubmit = async () => {

        if (handleCheckDataCompleteness()) {
            const now = Date.now();

            const newTransaction: ITransaction = {
                id: uuid.v4(),
                type: transactionType,
                value: Number(value),
                account,
                note,
                imageUri: null,
                date_of_create: now,
                last_update: date
            };


            // Replace ImageUri in case of select an image by user
            if (imageUri) {
                try {
                    // Detect format
                    const format = imageUri.split(".")[imageUri.split(".").length - 1];

                    // Generate a unique filename
                    const filename = `${now}.${format}`;

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
                // Get prev transactions data
                const prevTransactions = await AsyncStorage.getItem("transactions");
                const transactions: ITransaction[] = prevTransactions ? JSON.parse(prevTransactions) : [];

                // Prepare transactions to store
                transactions.push(newTransaction);

                // Store transactions to the store
                await AsyncStorage.setItem("transactions", JSON.stringify(transactions));

                // Show Success toast
                Toast.show({
                    type: 'success',
                    text2: t("create_transaction_success_message")
                });

                // Update account detail
                await handleUpdateAccount();

                // Redirect user to Transaction page
                navigation.navigate(t("transactions"));

            } catch (err) {

                // Show alert to user
                alert(t("create_transaction_error_message"));
            }
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                {/* -------------- Value -------------- */}
                <Text style={styles.title}>
                    {`${t("value")} (${t("currency")})`}
                </Text>
                <TextInput
                    style={featuredStyles.input}
                    inputMode="numeric"
                    value={value}
                    onChangeText={setValue}
                    placeholderTextColor={VARIABLES.GRAY_COLOR}
                />

                {/* -------------- Transaction type -------------- */}
                <Text style={styles.title}>
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
                <Text style={styles.title}>
                    {t("select_account")}
                </Text>
                <SelectAccount account={account} setAccount={setAccount} accounts={accounts} />

                {/* -------------- Date picker -------------- */}
                <Text style={styles.title}>
                    {t("select_date")}
                </Text>
                <MainDatePicker date={date} setDate={setDate} />

                {/* -------------- Note -------------- */}
                <Text style={styles.title}>
                    {t("note")}
                </Text>
                <TextInput
                    style={[featuredStyles.input, styles.note]}
                    value={note}
                    onChangeText={setNote}
                    numberOfLines={4}
                />

                {/* -------------- Add_Receipt_image -------------- */}
                <AddReceiptImage imageUri={imageUri} setImageUri={setImageUri} />

                {/* -------------- Finish Button -------------- */}
                <MainActionButton
                    text={t("add")}
                    type='primary'
                    icon={<Entypo name="plus" size={22} color={VARIABLES.WHITE_COLOR} />}
                    onPress={handleSubmit}
                />

            </ScrollView>
        </View>
    );
};
export default CreateTransactionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    title: {
        fontFamily: "vazir",
        fontSize: 18,
        paddingHorizontal: 5,
        marginTop: 20,
        textAlign: "right"
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