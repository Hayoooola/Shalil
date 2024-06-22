import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'jalali-moment';
import DatePicker from 'react-native-jalali-persian-date-picker';

import VARIABLES from '../../enums/variables';

interface IProps {
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
}


// Provides Main date picker
const MainDatePicker: FC<IProps> = ({ date, setDate }) => {

    return (
        <View style={styles.container}>
            <DatePicker
                value={date}
                onChange={(val) => setDate(val)}
                datePickerModalStyle={{ backgroundColor: VARIABLES.BLACK_COLOR }}
                eachMonthTextStyle={{ color: 'white' }}
                eachYearTextStyle={{ color: 'white' }}
                datePickerDismissIconColor={'white'}
                yearMonthTextStyle={{ color: 'white' }}
                dayTextColor={'#fff'}
                weekdayTextStyle={{ color: VARIABLES.PRIMARY_COLOR }}
                selectedDayColor={VARIABLES.PRIMARY_COLOR}
                selectedEachYearStyle={{ backgroundColor: VARIABLES.PRIMARY_COLOR }}
                selectedEachMonthStyle={{ backgroundColor: VARIABLES.PRIMARY_COLOR }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainDatePicker;