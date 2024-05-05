import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import CustomText from '../../components/Text';


const InteractionsScreen = () => {
    const { t } = useTranslation();

    return (
        <View>
            <CustomText>
                {t("interactions")}
            </CustomText>
        </View>
    );
};
export default InteractionsScreen;

const styles = StyleSheet.create({});