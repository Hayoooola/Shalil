import { BaseToast, ErrorToast } from 'react-native-toast-message';
import VARIABLES from './enums/variables';


const toastConfig = {

    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: VARIABLES.SECONDARY_COLOR }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontFamily: "vazir",
                fontSize: 14,
            }}
            text2Style={{
                fontFamily: "vazir",
                fontSize: 16,
                color: VARIABLES.SECONDARY_COLOR_DARK
            }}
        />
    ),

    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: VARIABLES.RED_COLOR }}
            text1Style={{
                fontFamily: "vazir",
                fontSize: 14,
            }}
            text2Style={{
                fontFamily: "vazir",
                fontSize: 16,
                color: VARIABLES.RED_COLOR
            }}
        />
    ),
};

export default toastConfig;