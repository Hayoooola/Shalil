import { Dispatch, FC, SetStateAction } from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { Menu, MenuOptions, MenuOption, MenuTrigger, } from 'react-native-popup-menu';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../../features/styles';
import VARIABLES from '../../../enums/variables';


interface IProps {
    imageUri: string;
    setImageUri: Dispatch<SetStateAction<string>>;
}


// Show user's Avatar in settings screen
const UsersAvatar: FC<IProps> = ({ imageUri, setImageUri }) => {
    const { t } = useTranslation();

    // Handle take a photo
    const handleTakePhoto = async () => {
        try {
            const { granted } = await ImagePicker.requestCameraPermissionsAsync();

            if (granted) {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: Platform.OS === "android" ? true : false,
                    aspect: undefined,
                    quality: 1,
                });

                setImageUri(result.assets[0].uri);
            } else {

                alert(t("camera_access_denied_message"));
            }

        } catch (err) {

            setImageUri(null);

        }
    };

    // Handle pick an image
    const handlePickImage = async () => {
        try {
            // No permissions request is necessary for launching the image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: Platform.OS === "android" ? true : false,
                aspect: undefined,
                quality: 1,
            });

            setImageUri(result.assets[0].uri);
        } catch (err) {

            setImageUri(null);

        }
    };



    return (
        <View>

            {/* ----------------- User's Avatar ----------------- */}
            <View style={featuredStyles.centering}>
                <View style={[styles.avatar_wrapper, featuredStyles.shadow]}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} width={120} height={120} borderRadius={120} />
                    ) : (
                        <Ionicons name="person-sharp" size={70} color="white" />)
                    }
                </View>
            </View>

            {/* ----------------- Change_image menu ----------------- */}
            <Menu>
                <MenuTrigger children={
                    <View style={styles.select_image_wrapper}>
                        <MaterialIcons name="add-a-photo" size={28} color={VARIABLES.GRAY_COLOR} />
                    </View>
                } />

                {/* pick_an_image */}
                <MenuOptions>
                    <MenuOption
                        onSelect={handlePickImage}
                        children={
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
                        } />

                    {/* Divider */}
                    <View style={featuredStyles.divider} />

                    {/* take_a_photo */}
                    <MenuOption
                        onSelect={handleTakePhoto}
                        children={
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
                        } />

                </MenuOptions>
            </Menu>
        </View>
    );
};
export default UsersAvatar;

const styles = StyleSheet.create({
    avatar_wrapper: {
        width: 120,
        height: 120,
        backgroundColor: VARIABLES.PRIMARY_COLOR,
        borderRadius: 120,
        alignItems: "center",
        justifyContent: "center",
    },
    select_image_wrapper: {
        flexDirection: "column-reverse",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10
    },
    menu_item: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10
    },
    menu_item_text: {
        fontFamily: "vazir",
        fontSize: 13,
        textAlign: "right"
    }
});