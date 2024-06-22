import ACCOUNT_TYPE from "../enums/account_type";
import TRANSACTION_TYPE from "../enums/transaction_type";


export default interface ITransaction {
    id: string | number[];
    type: TRANSACTION_TYPE;
    value: number;
    account: IAccountInTransaction;
    date_of_create: number;
    last_update: string;
    note?: string;
    imageUri?: string;
}

export interface IAccountInTransaction {
    id: string | number[];
    title: string;
    account_type: ACCOUNT_TYPE;
    imageUri: string | null;
}