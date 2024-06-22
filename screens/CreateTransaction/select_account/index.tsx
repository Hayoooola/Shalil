import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { IAccountInTransaction } from '../../../interfaces/transactions';
import IProject from '../../../interfaces/accounts';
import VARIABLES from '../../../enums/variables';
import ACCOUNT_TYPE from '../../../enums/account_type';

interface IProps {
    account: IAccountInTransaction | null;
    setAccount: Dispatch<SetStateAction<IAccountInTransaction | null>>;
    accounts: IProject[];
}


// Provides Select_account to create_new_transaction screen
const SelectAccount: FC<IProps> = ({ account, setAccount, accounts }) => {

    const { t } = useTranslation();

    // Handle select account
    const selectAccountHandler = (account: IProject) => {
        const { id, account_type, title, imageUri } = account;

        const newAccount: IAccountInTransaction = {
            id,
            account_type,
            title,
            imageUri
        };

        setAccount(newAccount);
    };



    return (
        <SelectDropdown
            data={accounts}
            onSelect={(selectedItem) => selectAccountHandler(selectedItem)}
            renderButton={(selectedItem, isOpened) => {
                return (
                    <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.title) || t("select_account_placeholder")}
                        </Text>
                    </View>
                );
            }}
            renderItem={(item, index, isSelected) => {
                const { imageUri, account_type } = item;

                return (
                    <View
                        style={[
                            styles.dropdownItemStyle,
                            { backgroundColor: index % 2 ? VARIABLES.WHITE_COLOR : "#fff" },
                            isSelected && { backgroundColor: VARIABLES.SECONDARY_COLOR_LIGHT },
                        ]}
                    >
                        {/* -------- Title -------- */}
                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>

                        {/* -------- Avatar -------- */}
                        {imageUri ? (
                            <View>
                                <Image source={{ uri: imageUri }} height={38} width={38} borderRadius={5} />
                            </View>
                        ) : account_type === ACCOUNT_TYPE.PERSONAL ? (
                            <FontAwesome name="credit-card" size={26} color={VARIABLES.GRAY_COLOR_DARK} />
                        ) : (
                            <MaterialCommunityIcons name="account-multiple-plus" size={34} color={VARIABLES.GRAY_COLOR_DARK} />
                        )}
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    );

};
export default SelectAccount;

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: "100%",
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontFamily: "vazir",
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 8,
        gap: 10
    },
    dropdownItemTxtStyle: {
        fontSize: 18,
        fontFamily: "vazir",
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});