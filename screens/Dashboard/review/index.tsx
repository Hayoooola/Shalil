import { Fragment, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import VARIABLES from '../../../enums/variables';
import SingleCard from './single-card';
import CreateNewAccountBtn from './add_account_btn';
import MainDivider from '../../../components/Divider';
import { fetchProjects } from '../../../store/reducers/projects';
import MainLoading from '../../../components/Loading';
import IStore from '../../../interfaces/store';
import IProject from '../../../interfaces/projects';
import CustomText from '../../../components/Text';


// Provides accounts review in Dashboard view
const Review = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { data, error, loading } = useSelector((store: IStore) => store.projects);

  // Fetch All projects
  useFocusEffect(
    useCallback(() => {
      // @ts-ignore
      dispatch(fetchProjects());
    }, [])
  );

  // Update initial Projects to show
  useMemo(() => {
    data.length && setProjects(data);
  }, [data]);

  // Handle show error toast in case of Un-Successful loading projects
  useMemo(() => {
    error && Toast.show({
      type: "error",
      text2: t("failed_to_load_data")
    });
  }, [error]);


  return (
    <View style={styles.container}>

      {loading ? (
        <MainLoading />
      ) : (
        <>
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
            {projects.length ? (projects.map((singleProject, index) => (
              <Fragment key={index}>
                <SingleCard projectData={singleProject} />
                <MainDivider />
              </Fragment>
            ))) : (
              <View style={{ paddingTop: 20, alignItems: "center" }}>
                <CustomText>
                  {t("project_not_found")}
                </CustomText>
              </View>
            )}

            {/* Create a new Account Btn */}
            <View style={{ paddingHorizontal: 20 }}>
              <CreateNewAccountBtn secondary={true} />
            </View>

          </ScrollView>
        </>
      )}

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