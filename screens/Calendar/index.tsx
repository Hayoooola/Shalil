import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import CustomText from '../../components/Text';


const CalendarScreen = () => {
    const { t } = useTranslation();

    return (
        <View>
            <CustomText>
                {t("calendar")}
            </CustomText>
        </View>
    );
};
export default CalendarScreen;

const styles = StyleSheet.create({});