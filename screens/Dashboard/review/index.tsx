import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Entypo from '@expo/vector-icons/Entypo';

import VARIABLES from '../../../enums/variables';
import SingleCard from './single-card';
import CreateNewAccountBtn from './add_account_btn';


// Provides accounts review in Dashboard view
const Review = () => {
  const { t } = useTranslation();


  return (
    <View style={styles.container}>

      {/* --------- Header ---------- */}
      <View>
        <Text style={styles.header}>
          {t("review_account")}
        </Text>
        <View style={styles.header_icon}>
          <Entypo name="chevron-small-down" size={32} color={VARIABLES.PRIMARY_COLOR} />
        </View>
      </View>

      {/* --------- Lists ---------- */}
      <ScrollView contentContainerStyle={styles.wrapper}>
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />
        <SingleCard />

        {/* Create a new Account Btn */}
        <CreateNewAccountBtn />

      </ScrollView>

    </View>
  );
};
export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    paddingTop: 30,
    marginBottom: 5
  },
  header: {
    fontFamily: "vazir",
    fontSize: 20,
    color: VARIABLES.PRIMARY_COLOR,
    textAlign: "center"
  },
  header_icon: {
    width: "100%",
    alignItems: "center",
    marginTop: -5
  },
  wrapper: {
    backgroundColor: VARIABLES.WHITE_COLOR,
    borderRadius: 15,
  }
});