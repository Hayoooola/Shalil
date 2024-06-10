import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import { useTranslation } from 'react-i18next';

import MainActionButton from '../../../../components/ActionButton';
import VARIABLES from '../../../../enums/variables';
import { FC } from 'react';

interface IProps {
  secondary?: boolean;
}


// Provides a btn navigate user to create a new account
const CreateNewAccountBtn: FC<IProps> = ({ secondary }) => {
  const { t } = useTranslation();

  const navigation = useNavigation<any>();

  // Handle click on create a new account btn
  const handlePress = () => navigation.navigate(t("add_account"));


  return (
    <MainActionButton
      text={t("add_account")}
      type={secondary ? 'secondary' : "primary"}
      icon={<Entypo name="plus" size={22} color={VARIABLES.WHITE_COLOR} />}
      onPress={handlePress}
    />
  );
};
export default CreateNewAccountBtn;