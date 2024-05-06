import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import CustomText from '../../components/Text';


const AccountsScreen = () => {
    const { t } = useTranslation();

    return (
        <View>
            <CustomText>
                {t("accounts")}
            </CustomText>
        </View>
    );
};
export default AccountsScreen;

const styles = StyleSheet.create({});