import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import CustomText from '../../components/Text';


const DashboardScreen = () => {
    const { t } = useTranslation();

    return (
        <View>
            <CustomText>
                {t("dashboard")}
            </CustomText>
        </View>
    );
};
export default DashboardScreen;

const styles = StyleSheet.create({});