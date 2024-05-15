import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import { useTranslation } from 'react-i18next';

import { SecondaryGradient } from '../../../../components/Gradient';
import VARIABLES from '../../../../enums/variables';


// Provides a btn navigate user to create a new account
const CreateNewAccountBtn = () => {
  const { t } = useTranslation();

  const navigation = useNavigation<any>();


  return (
    <TouchableOpacity
      style={styles.create_new_account_container}
      onPress={() => navigation.navigate(t("add_account"))}
    >
      <SecondaryGradient borderRadius={5}>
        <View style={styles.create_new_account}>

          {/* Icon */}
          <Entypo name="plus" size={22} color={VARIABLES.WHITE_COLOR} />

          {/* Text */}
          <Text style={styles.add_new_text}>
            {t("add_account")}
          </Text>

        </View>
      </SecondaryGradient>
    </TouchableOpacity>
  );
};
export default CreateNewAccountBtn;


const styles = StyleSheet.create({

  create_new_account_container: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  create_new_account: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingVertical: 10,
  },
  add_new_text: {
    fontFamily: "vazir",
    fontSize: 16,
    color: "#fff"
  }
});