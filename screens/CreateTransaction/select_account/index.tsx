import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import CreateAccountScreen from '../../CreateAccount';
import { fetchAccounts } from '../../../store/reducers/accounts';
import IAccount from '../../../interfaces/accounts';
import { IAccountInTransaction } from '../../../interfaces/transactions';
import ACCOUNT_TYPE from '../../../enums/account_type';
import VARIABLES from '../../../enums/variables';

interface IProps {
    account: IAccountInTransaction | null;
    setAccount: Dispatch<SetStateAction<IAccountInTransaction | null>>;
    accounts: IAccount[];
}


// Provides Select_account to create_new_transaction screen
const SelectAccount: FC<IProps> = ({ account, setAccount, accounts }) => {
    const [isCreateAccountModalOpen, SetIsCreateAccountModalOpen] = useState(false);

    const { t } = useTranslation();

    const dispatch = useDispatch<any>();

    // Handle select account
    const selectAccountHandler = (account: IAccount) => {
        const { id, account_type, title, imageUri } = account;

        // Handle open create_new_account modal in case of no account created before
        if (id === "-1") {
            SetIsCreateAccountModalOpen(true);

        } else {
            const newAccount: IAccountInTransaction = {
                id,
                account_type,
                title,
                imageUri
            };

            setAccount(newAccount);
        }
    };

    // Handle select account in case of create_new_account
    const HandleFinishCreateAccount = async (newAccount: IAccount) => {
        SetIsCreateAccountModalOpen(false);
        await dispatch(fetchAccounts());
        setAccount(newAccount);
    };

    // Handle cancel create_account
    const handleCancelCreateAccount = () => {
        setAccount(null);
        SetIsCreateAccountModalOpen(false);
    };


    return (
        <>
            {/* ----------------- Select_account DropDown ----------------- */}
            <SelectDropdown
                data={accounts}
                onSelect={(selectedItem) => selectAccountHandler(selectedItem)}
                defaultValueByIndex={accounts.findIndex(item => item.id === account?.id)}
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

            {/* ----------------- Create_account Modal ----------------- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isCreateAccountModalOpen}
            >
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    <CreateAccountScreen
                        route={{ params: {} }}
                        onFinish={HandleFinishCreateAccount}
                    />

                    {/* ----- Cancel_btn ----- */}
                    <View style={styles.createAccountCancelBtn}>
                        <TouchableOpacity onPress={handleCancelCreateAccount}>
                            <Ionicons name="close-circle" size={32} color={VARIABLES.PRIMARY_COLOR_DARK} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
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
    createAccountCancelBtn: {
        position: "absolute",
        left: 15,
        top: 15
    }
});