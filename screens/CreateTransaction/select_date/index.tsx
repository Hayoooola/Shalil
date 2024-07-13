import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import MainDatePicker from '../../../components/DatePicker';
import featuredStyles from '../../../features/styles';
import VARIABLES from '../../../enums/variables';

interface IProps {
    date: string;
    setDate: Dispatch<SetStateAction<string>>;
}


// Provides Select_date to create_new_transaction screen
const SelectDate: FC<IProps> = ({ date, setDate }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Handle open DatePickerModal
    const handleOpen = () => setIsOpen(true);


    return (
        <ScrollView>
            <View style={styles.wrapper}>
                {/* Date to show */}
                <Text style={[featuredStyles.text, styles.date]}>
                    {date}
                </Text>

                {/* Edit_btn */}
                <TouchableOpacity onPress={handleOpen}>
                    <AntDesign name="edit" size={26} color={VARIABLES.PRIMARY_COLOR_DARK} />
                </TouchableOpacity>
            </View>

            <View style={{ height: isOpen ? "auto" : 0 }}>
                <MainDatePicker date={date} setDate={setDate} />
            </View>

        </ScrollView>
    );
};
export default SelectDate;

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    date: {
        textAlign: "center",
        color: VARIABLES.GRAY_COLOR_DARK,
        fontSize: 16
    }
});