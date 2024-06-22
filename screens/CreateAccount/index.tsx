import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';

import featuredStyles from '../../features/styles';
import { useTranslation } from 'react-i18next';
import VARIABLES from '../../enums/variables';
import ACCOUNT_TYPE from '../../enums/account_type';
import Avatar from './Avatar';
import MainGradient from '../../components/Gradient';
import IAccount from '../../interfaces/accounts';


// Provides Create new Account page
const CreateAccountScreen = () => {
    const [title, setTitle] = useState("");
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.PERSONAL);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [note, setNote] = useState("");

    const navigation = useNavigation<any>();

    const { t } = useTranslation();


    // Handle Create a new account
    const handleSubmit = async () => {
        const now = Date.now();

        const newAccount: IAccount = {
            id: uuid.v4(),
            title,
            account_type: accountType,
            note,
            imageUri: null,
            total: 0,
            date_of_create: now,
            last_update: now
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
                newAccount.imageUri = newImageUri;

            } catch (err) {

                // Show alert to user
                alert(t("select_image_error_message"));
            }
        }


        // Storing data
        try {
            // Get prev Accounts data
            const prevAccounts = await AsyncStorage.getItem("Accounts");
            const Accounts: IAccount[] = prevAccounts ? JSON.parse(prevAccounts) : [];

            // Prepare Accounts to store
            Accounts.push(newAccount);

            // Store Accounts to the store
            await AsyncStorage.setItem("accounts", JSON.stringify(Accounts));

            // Show Success toast
            Toast.show({
                type: 'success',
                text2: t("create_Account_success_message")
            });

            // Redirect user to Account page
            navigation.navigate(t("accounts"));

        } catch (err) {

            // Show alert to user
            alert(t("create_Account_error_message"));
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                {/* -------------- Title -------------- */}
                <Text style={styles.title}>
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

                {/* -------------- Account type -------------- */}
                <Text style={styles.title}>
                    {t("account_type")}
                </Text>
                <View style={featuredStyles.btn_group_wrapper}>

                    {/* Personal */}
                    <TouchableOpacity
                        style={accountType === ACCOUNT_TYPE.PERSONAL ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                        onPress={() => setAccountType(ACCOUNT_TYPE.PERSONAL)}
                    >
                        <Text style={featuredStyles.btn_group_text}>
                            {t("personal")}
                        </Text>
                    </TouchableOpacity>

                    {/* Shared */}
                    <TouchableOpacity
                        style={accountType === ACCOUNT_TYPE.SHARED ? [featuredStyles.btn_group, featuredStyles.btn_group_active] : featuredStyles.btn_group}
                        onPress={() => setAccountType(ACCOUNT_TYPE.SHARED)}
                    >
                        <Text style={featuredStyles.btn_group_text}>
                            {t("shared")}
                        </Text>
                    </TouchableOpacity>

                </View>


                {/* -------------- Avatar -------------- */}
                <Avatar
                    accountType={accountType}
                    imageUri={imageUri}
                    setImageUri={setImageUri}
                />


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


                {/* -------------- Finish Button -------------- */}
                <TouchableOpacity
                    style={styles.create_new_account_container}
                    onPress={handleSubmit}
                    disabled={!title}
                >
                    <MainGradient borderRadius={5}>
                        <View style={styles.create_new_account}>

                            {/* Icon */}
                            <Entypo name="plus" size={22} color={VARIABLES.WHITE_COLOR} />

                            {/* Text */}
                            <Text style={styles.add_new_text}>
                                {t("add")}
                            </Text>

                        </View>
                    </MainGradient>
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
    title: {
        fontFamily: "vazir",
        fontSize: 18,
        paddingHorizontal: 5,
        marginTop: 15,
        textAlign: "right"
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