import { FC, ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MainGradient, { SecondaryGradient } from '../Gradient';

interface IProps {
    text: string,
    icon?: ReactNode,
    onPress: () => void;
    type: "primary" | "secondary";
}


// Provides a btn navigate user to create a new account
const MainActionButton: FC<IProps> = ({ text, icon, onPress, type }) => {
    return (
        <TouchableOpacity
            style={styles.create_new_account_container}
            onPress={onPress}
        >
            {type === "primary" ? (
                <MainGradient borderRadius={5}>
                    <View style={styles.create_new_account}>

                        {/* Icon */}
                        {icon ? icon : null}

                        {/* Text */}
                        <Text style={styles.add_new_text}>
                            {text}
                        </Text>

                    </View>
                </MainGradient>
            ) : (
                <SecondaryGradient borderRadius={5}>
                    <View style={styles.create_new_account}>

                        {/* Icon */}
                        {icon ? icon : null}

                        {/* Text */}
                        <Text style={styles.add_new_text}>
                            {text}
                        </Text>
                    </View>
                </SecondaryGradient>
            )}

        </TouchableOpacity>
    );
};
export default MainActionButton;


const styles = StyleSheet.create({

    create_new_account_container: {
        marginTop: 20,
        marginBottom: 10,
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