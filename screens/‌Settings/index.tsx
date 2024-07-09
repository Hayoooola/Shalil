import { useCallback, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useTranslation } from 'react-i18next';

import MainActionButton from '../../components/ActionButton';
import MainLoading from '../../components/Loading';
import featuredStyles from '../../features/styles';
import { defaultProfile, editProfile, fetchProfile } from '../../store/reducers/profile';
import IProfile from '../../interfaces/profile';
import IStore from '../../interfaces/store';
import VARIABLES from '../../enums/variables';
import SupportModal from './support_modal';
import LANGUAGES from '../../enums/language';
import UsersAvatar from './avatar';
import { StatusBar } from 'expo-status-bar';


// Provides Settings page
const SettingsScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [imageUri, setImageUri] = useState("");
    const [profile, setProfile] = useState<IProfile>(defaultProfile);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch<any>();

    const { data: profileData, error, loading } = useSelector((store: IStore) => store.profile);


    // Handle fetch profileData
    useFocusEffect(
        useCallback(() => {
            // @ts-ignore
            dispatch(fetchProfile());
        }, [])
    );

    // Update Profile data and inputs
    useMemo(() => {
        if (profileData) {
            setProfile(profileData);
            setName(profileData.name);
            setEmail(profileData.email);
            setPhone(profileData.phone);
            setImageUri(profileData.imageUri);
        }
    }, [profileData]);

    // Handle show error toast in case of Un-Successful loading Accounts
    useMemo(() => {
        error && Toast.show({
            type: "error",
            text2: t("failed_to_load_data")
        });
    }, [error]);

    // Handle Submit changes
    const handleSubmit = async () => {
        if (!name) {
            Toast.show({
                type: "error",
                text2: t("name_error_msg")
            });

        } else {
            try {
                const newProfile: IProfile = {
                    name,
                    email,
                    imageUri,
                    language: LANGUAGES.PERSIAN,
                    phone
                };

                await dispatch(editProfile(newProfile));

                Toast.show({
                    type: "success",
                    text2: t("edit_profile_success")
                });

            } catch (err) {

                Toast.show({
                    type: "error",
                    text2: t("edit_profile_failed")
                });
            }

        }
    };



    return (
        <ScrollView style={styles.container}>
            <StatusBar hidden={true} />

            {loading ? (
                <MainLoading />
            ) : (
                <>
                    {/* ----------------------------- Setting Content ----------------------------- */}
                    <ScrollView contentContainerStyle={styles.wrapper}>

                        {/* ---------- Profile Avatar ----------  */}
                        <UsersAvatar imageUri={imageUri} setImageUri={setImageUri} />

                        {/* ---------- Profile ‌Name ---------- */}
                        <View style={featuredStyles.centering}>
                            <Text style={[featuredStyles.text, styles.name]}>
                                {profile.name ? profile.name : t("default_name")}
                            </Text>
                        </View>

                        {/* ---------- ‌Name Input ---------- */}
                        <Text style={featuredStyles.title}>
                            {t("full_name")}
                        </Text>
                        <TextInput
                            style={featuredStyles.input}
                            value={name}
                            onChangeText={setName}
                            maxLength={50}
                        />

                        {/* ---------- Phone Input ---------- */}
                        <Text style={featuredStyles.title}>
                            {t("phone")}
                        </Text>
                        <TextInput
                            style={featuredStyles.input}
                            value={phone}
                            onChangeText={setPhone}
                            maxLength={50}
                            placeholder={t("phone_placeholder")}
                            placeholderTextColor={VARIABLES.GRAY_COLOR}
                        />

                        {/* ---------- Email Input ---------- */}
                        <Text style={featuredStyles.title}>
                            {t("email")}
                        </Text>
                        <TextInput
                            style={featuredStyles.input}
                            value={email}
                            onChangeText={setEmail}
                        />

                        {/* ---------- Support btn ---------- */}
                        <View style={styles.action_btn_wrapper}>
                            <TouchableOpacity onPress={() => setIsSupportModalOpen(true)}>
                                <View style={styles.support_container}>
                                    <Text style={[featuredStyles.text, { color: VARIABLES.PRIMARY_COLOR_DARK }]}>
                                        {`${t("report_issue")}/${t("support")}`}
                                    </Text>
                                    <FontAwesome6 name="clipboard-question" size={24} color={VARIABLES.PRIMARY_COLOR_DARK} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* ---------- Submit changes btn ---------- */}
                        <TouchableOpacity
                            style={styles.submit_wrapper}
                            onPress={handleSubmit}
                            disabled={!name}
                        >
                            <MainActionButton
                                text={t("submit")}
                                type='primary'
                                onPress={handleSubmit}
                            />
                        </TouchableOpacity>

                    </ScrollView>

                    {/* --------------------------- Support modal --------------------------- */}
                    <SupportModal
                        isSupportModalOpen={isSupportModalOpen}
                        setIsSupportModalOpen={setIsSupportModalOpen}
                    />
                </>
            )}
        </ScrollView>
    );
};
export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40
    },
    avatar_wrapper: {
        width: 120,
        height: 120,
        backgroundColor: VARIABLES.PRIMARY_COLOR,
        borderRadius: 120,
        alignItems: "center",
        justifyContent: "center",
    },
    name: {
        color: VARIABLES.PRIMARY_COLOR_DARK,
        fontSize: 16
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 25,
        paddingBottom: 50
    },
    submit_wrapper: {
        marginTop: 20,
        marginBottom: 10,
    },
    action_btn_wrapper: {
        marginTop: 50,
        marginBottom: -20,
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        alignItems: "center",
        width: "100%"
    },
    support_container: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});