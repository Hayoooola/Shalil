import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Ionicons from '@expo/vector-icons/Ionicons';

import featuredStyles from '../../../features/styles';
import { useTranslation } from 'react-i18next';
import VARIABLES from '../../../enums/variables';
import ACCOUNT_TYPE from '../../../enums/account_type';

interface IProps {
    accountType: ACCOUNT_TYPE;
    imageUri: string;
    setImageUri: Dispatch<SetStateAction<string>>;
}


// Provide Avatar to create_new_account screen
const Avatar: FC<IProps> = ({ accountType, imageUri, setImageUri }) => {
    const [isSelectImageModalOpen, setIsSelectImageModalOpen] = useState(false);

    const { t } = useTranslation();

    // Handle open & close select-image-menu
    const hideMenu = () => setIsSelectImageModalOpen(false);
    const showMenu = () => setIsSelectImageModalOpen(true);

    // Handle take a photo
    const handleTakePhoto = async () => {
        try {
            const { granted } = await ImagePicker.requestCameraPermissionsAsync();

            if (granted) {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    quality: 1,
                });

                setImageUri(result.assets[0].uri);
            } else {

                alert(t("camera_access_denied_message"));
            }

        } catch (err) {

            setImageUri(null);
        } finally {

            hideMenu();
        }
    };


    // Handle pick an image
    const handlePickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
            });

            setImageUri(result.assets[0].uri);
        } catch (err) {

            setImageUri(null);
        } finally {

            hideMenu();
        }
    };


    // Handle remove image
    const handleRemoveImage = () => setImageUri(null);



    return (
        <View style={styles.avatar_wrapper}>

            {/* ----------------- Avatar ----------------- */}
            <View style={[styles.avatar, featuredStyles.shadow, { backgroundColor: VARIABLES.SECONDARY_COLOR }]}>
                {imageUri ? (
                    <View>

                        {/* ----- Image ----- */}
                        <Image source={{ uri: imageUri }} height={74} width={74} borderRadius={10} />

                        {/* ----- Cancel_btn ----- */}
                        <View style={styles.cancel_btn_wrapper}>
                            <TouchableOpacity onPress={handleRemoveImage}>
                                <Ionicons name="close-circle" size={28} color={VARIABLES.PRIMARY_COLOR_DARK} />
                            </TouchableOpacity>
                        </View>

                    </View>
                ) : accountType === ACCOUNT_TYPE.PERSONAL ? (
                    <FontAwesome name="credit-card" size={48} color="white" />
                ) : (
                    <MaterialCommunityIcons name="account-multiple-plus" size={56} color="white" />
                )}
            </View>

            {/* ----------------- Select-image-menu ----------------- */}
            <Menu
                visible={isSelectImageModalOpen}
                anchor={
                    <TouchableOpacity onPress={showMenu}>
                        <View style={styles.select_image_wrapper}>
                            <Text style={featuredStyles.text}>
                                {t("select_image")}
                            </Text>
                            <MaterialIcons name="add-a-photo" size={32} color={VARIABLES.GRAY_COLOR} />
                        </View>
                    </TouchableOpacity>
                }
                onRequestClose={hideMenu}
            >

                {/* pick_an_image */}
                <MenuItem onPress={handlePickImage}  >
                    <View style={styles.menu_item}>
                        <View>
                            <Text style={styles.menu_item_text}>
                                {t("pick_an_image")}
                            </Text>
                        </View>
                        <View>
                            <MaterialIcons name="photo" size={24} color={VARIABLES.PRIMARY_COLOR_DARK} />
                        </View>
                    </View>
                </MenuItem>

                {/* Divider */}
                <MenuDivider />

                {/* take_a_photo */}
                <MenuItem onPress={handleTakePhoto} >
                    <View style={styles.menu_item}>
                        <View>
                            <Text style={styles.menu_item_text}>
                                {t("take_a_photo")}
                            </Text>
                        </View>
                        <View>
                            <AntDesign name="camera" size={24} color={VARIABLES.PRIMARY_COLOR_DARK} />
                        </View>
                    </View>
                </MenuItem>
            </Menu>



        </View>
    );
};
export default Avatar;
const styles = StyleSheet.create({
    avatar_wrapper: {
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        paddingTop: 16
    },
    avatar: {
        width: 74,
        height: 74,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    select_image_wrapper: {
        flexDirection: "column-reverse",
        justifyContent: "center",
        alignItems: "center"
    },
    menu_item: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    menu_item_text: {
        fontFamily: "vazir",
        fontSize: 13,
        textAlign: "right"
    },
    cancel_btn_wrapper: {
        position: "absolute",
        left: -14,
        top: -14
    }
});