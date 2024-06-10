import { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import moment from 'jalali-moment';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import featuredStyles from '../../../../features/styles';
import VARIABLES from '../../../../enums/variables';
import IProject from '../../../../interfaces/projects';
import ACCOUNT_TYPE from '../../../../enums/account_type';

interface IProps {
    projectData: IProject;
}


// Provides single-account to review section in Dashboard view
const SingleCard: FC<IProps> = ({ projectData }) => {
    const { t } = useTranslation();

    // Handle find total Style
    const handleTotalStyle = () => (
        projectData.total > 0 ? (styles.total_creditor) :
            projectData.total < 0 ? (styles.total_creditor) :
                styles.total_cleared
    );

    // Handle calculate and show total
    const handleCalculateTotal = () => (
        projectData.total > 0 ? (`+ ${(98000).toLocaleString("fa")} ${t("currency")}`) :
            projectData.total < 0 ? (`+ ${(98000).toLocaleString("fa")} ${t("currency")}`) :
                t("square")
    );


    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>

                {/* -------- Project-Avatar -------- */}
                <View style={[styles.avatar_wrapper, featuredStyles.shadow]}>
                    {projectData.imageUri ? (
                        <Image source={{ uri: projectData.imageUri }} width={40} height={40} borderRadius={10} />
                    ) : (
                        projectData.account_type === ACCOUNT_TYPE.PERSONAL ? (
                            <FontAwesome name="credit-card" size={22} color="white" />
                        ) : (
                            <MaterialCommunityIcons name="account-multiple-plus" size={32} color="white" />
                        )
                    )}
                </View>

                {/* -------- Content -------- */}
                <View style={{ flex: 1 }}>

                    {/* Title */}
                    <Text style={[styles.text, styles.title]} numberOfLines={2}>
                        {projectData.title}
                    </Text>

                    {/* Total */}
                    <Text style={[styles.text, styles.total, handleTotalStyle()]}>
                        {handleCalculateTotal()}
                    </Text>

                    {/* Date */}
                    <Text style={[styles.text, styles.date]}>
                        {moment(projectData.last_update).locale("fa-IR").format('jYYYY/jMM/jD - HH:mm')}
                    </Text>

                </View>

            </View>
        </View>
    );
};
export default SingleCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        paddingTop: 5
    },
    wrapper: {
        flex: 1,
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: 15,
    },
    avatar_wrapper: {
        width: 40,
        height: 40,
        backgroundColor: VARIABLES.SECONDARY_COLOR,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontFamily: "vazir",
        textAlign: "right"
    },
    title: {
        fontSize: 18,
    },
    total: {
        fontSize: 18,
        color: VARIABLES.SECONDARY_COLOR_DARK
    },
    total_cleared: {
        color: VARIABLES.PRIMARY_COLOR_DARK,
        fontSize: 15,
    },
    total_debtor: {
        color: VARIABLES.RED_COLOR
    },
    total_creditor: {
        color: VARIABLES.SECONDARY_COLOR_DARK
    },
    date: {
        fontSize: 13,
        color: VARIABLES.BLACK_COLOR,
        textAlign: "left"
    }
});