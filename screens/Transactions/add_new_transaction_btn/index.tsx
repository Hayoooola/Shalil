import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import { useTranslation } from 'react-i18next';

import MainActionButton from '../../../components/ActionButton';
import VARIABLES from '../../../enums/variables';


// Provides a btn navigate user to create a new Transaction
const CreateNewTransactionBtn = () => {
    const { t } = useTranslation();

    const navigation = useNavigation<any>();

    // Handle click on create a new Transaction btn
    const handlePress = () => navigation.navigate(t("add_transaction"));


    return (
        <MainActionButton
            text={t("add_transaction")}
            type="primary"
            icon={<Entypo name="plus" size={22} color={VARIABLES.WHITE_COLOR} />}
            onPress={handlePress}
        />
    );
};
export default CreateNewTransactionBtn;