import { Dispatch, FC, SetStateAction } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from "react-i18next";

import featuredStyles from "../../../features/styles";
import VARIABLES from "../../../enums/variables";

interface IProps {
    isSupportModalOpen: boolean;
    setIsSupportModalOpen: Dispatch<SetStateAction<boolean>>;
}


// Provides support modal content in settings page
const SupportModal: FC<IProps> = ({ isSupportModalOpen, setIsSupportModalOpen }) => {
    const { t } = useTranslation();


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isSupportModalOpen}
        >
            <View style={styles.container}>

                <ScrollView>
                    <Text style={[featuredStyles.title]}>
                        {t("dear_user")}
                    </Text >
                    <Text style={[featuredStyles.title, styles.text]}>
                        {`${t("thanks_user")}. ${t("support_msg")}:`}
                    </Text >
                    <Text style={[featuredStyles.title, styles.phone]}>
                        {`${t("phone_support")}: ${t("phone_number")}`}
                    </Text >
                    <Text style={[featuredStyles.title, styles.phone, { marginTop: -5 }]}>
                        {`${t("email")}: ${t("email_address")}`}
                    </Text >
                    <Text style={[featuredStyles.title, styles.text, { paddingTop: 40 }]}>
                        {t("thanks")}
                    </Text >
                    <Text style={[featuredStyles.text, styles.text]}>
                        {t("app_support")}
                    </Text >
                </ScrollView>


                {/* ----- Cancel_btn ----- */}
                <View style={styles.cancelBtn}>
                    <TouchableOpacity onPress={() => setIsSupportModalOpen(false)}>
                        <Ionicons name="close-circle" size={32} color={VARIABLES.PRIMARY_COLOR_DARK} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
export default SupportModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 60,
        paddingHorizontal: 20
    },
    cancelBtn: {
        position: "absolute",
        left: 20,
        top: 15
    },
    text: {
        fontSize: 16,
        textAlign: "justify",
        color: VARIABLES.GRAY_COLOR_DARK,
    },
    phone: {
        fontSize: 18,
        color: VARIABLES.PRIMARY_COLOR_DARK,
        textAlign: "center"
    }
});