import { FC, useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';
import moment from 'moment-jalaali';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import Avatar from './Avatar';
import MainActionButton from '../../components/ActionButton';
import { createAccount, editAccount } from '../../store/reducers/accounts';
import featuredStyles from '../../features/styles';
import IAccount from '../../interfaces/accounts';
import VARIABLES from '../../enums/variables';
import ACCOUNT_TYPE from '../../enums/account_type';

interface IProps {
    route: any;
    onFinish?: (newAccount: IAccount) => Promise<void>;
}


// Provides Create new Account page
const CreateAccountScreen: FC<IProps> = ({ route, onFinish }) => {
    const [title, setTitle] = useState("");
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.PERSONAL);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [note, setNote] = useState("");

    const navigation = useNavigation<any>();

    const { t } = useTranslation();

    const dispatch = useDispatch<any>();

    const params = route.params;
    const currentAccount: IAccount | undefined = params ? params.currentAccount : undefined;

    // Update update initial account info in case of updating an account
    useMemo(() => {
        if (currentAccount) {
            setTitle(currentAccount.title);
            setAccountType(currentAccount.account_type);
            setImageUri(currentAccount.imageUri);
            setNote(currentAccount.note);
        }
    }, [currentAccount]);


    // Handle Create a new account
    const handleSubmit = async () => {
        const now = moment(new Date()).locale("fa-IR").format("jYYYY/jMM/jDD_HH:mm");

        const newAccount: IAccount = {
            id: currentAccount ? currentAccount.id : uuid.v4(),
            title,
            account_type: accountType,
            note,
            imageUri: null,
            total: currentAccount ? currentAccount.total : 0,
            date_of_create: currentAccount ? currentAccount.date_of_create : now,
            last_update: now
        };


        // Replace ImageUri in case of select an image by user
        if (imageUri) {
            try {
                // Detect format
                const format = imageUri.split(".")[imageUri.split(".").length - 1];

                // Generate a unique filename
                const filename = `${Date.now()}.${format}`;

                // Get a writeable directory on the device
                const directory = await FileSystem.documentDirectory;

                const newImageUri = `${directory}${filename}`;

                // Move the captured image to the writeable directory
                await FileSystem.moveAsync({
                    from: imageUri,
                    to: newImageUri,
                });

                // Replace new ImageUri
                newAccount.imageUri = newImageUri;

            } catch (err) {

                // Show alert to user
                alert(t("select_image_error_message"));
            }
        }


        try {

            // Handle edit/create account
            currentAccount ? await dispatch(editAccount(newAccount)) : await dispatch(createAccount(newAccount));

            // Show Success toast
            Toast.show({
                type: 'success',
                text2: currentAccount ? t("edit_account_success_message") : t("create_Account_success_message")
            });

            // Redirect user to Account page
            onFinish ? onFinish(newAccount) : navigation.navigate(t("accounts"));

        } catch (err) {

            // Show alert to user
            currentAccount ? alert(t("edit_account_failed_message")) : alert(t("create_Account_error_message"));
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={true} />

            <ScrollView style={styles.container}>

                {/* -------------- Title -------------- */}
                <Text style={featuredStyles.title}>
                    {t("title")}
                </Text>
                <TextInput
                    style={featuredStyles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder={t("custom_title")}
                    maxLength={50}
                    placeholderTextColor={VARIABLES.GRAY_COLOR}
                />

                {/* Disabled for the MVP */}
                {/* -------------- Account type -------------- */}
                {/* <Text style={styles.title}>
                    {t("account_type")}
                </Text>
                <View style={featuredStyles.btn_group_wrapper}>

                    <TouchableOpacity
                        style={accountType === ACCOUNT_TYPE.PERSONAL ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                        onPress={() => setAccountType(ACCOUNT_TYPE.PERSONAL)}
                    >
                        <Text style={featuredStyles.btn_group_text}>
                            {t("personal")}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={accountType === ACCOUNT_TYPE.SHARED ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                        onPress={() => setAccountType(ACCOUNT_TYPE.SHARED)}
                    >
                        <Text style={featuredStyles.btn_group_text}>
                            {t("shared")}
                        </Text>
                    </TouchableOpacity>

                </View> */}


                {/* -------------- Avatar -------------- */}
                <Avatar
                    accountType={accountType}
                    imageUri={imageUri}
                    setImageUri={setImageUri}
                />


                {/* -------------- Note -------------- */}
                <Text style={featuredStyles.title}>
                    {t("note")}
                </Text>
                <TextInput
                    style={[featuredStyles.input, styles.note]}
                    value={note}
                    onChangeText={setNote}
                    numberOfLines={4}
                />


                {/* -------------- Finish Button -------------- */}
                <TouchableOpacity
                    style={styles.create_new_account_container}
                    onPress={handleSubmit}
                    disabled={!title}
                >
                    <MainActionButton
                        text={currentAccount ? t("submit_changes") : t("add")}
                        type='primary'
                        icon={currentAccount ? null : <Entypo name="plus" size={22} color={VARIABLES.WHITE_COLOR} />}
                        onPress={handleSubmit}
                    />
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};
export default CreateAccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 15
    },
    note: {
        height: 96
    },
    create_new_account_container: {
        marginTop: 20,
        marginBottom: 10,
    },
    create_new_account: {
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