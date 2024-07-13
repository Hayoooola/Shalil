import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import JalaliCalendarPicker from 'react-native-persian-jalali-calendar-picker';

import VARIABLES from '../../enums/variables';
import featuredStyles from '../../features/styles';

interface IProps {
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
}


// Provides Main date picker
const MainDatePicker: FC<IProps> = ({ date, setDate }) => {
    return (
        <View>
            <JalaliCalendarPicker
                Time={true}
                selected={date.slice(0, 10)}
                headerStyleText={featuredStyles.text}
                headerStyleTextCenter={featuredStyles.text}
                weekStyleText={featuredStyles.text}
                primaryColor={VARIABLES.PRIMARY_COLOR_DARK}
                currentTime={date.slice(11, 16)}
                onDateChange={d => setDate(d)}
                max={null}
                min={null}
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