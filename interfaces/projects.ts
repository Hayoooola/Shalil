import ACCOUNT_TYPE from "../enums/account_type";

export default interface IProject {
    id: string | number[];
    title: string;
    account_type: ACCOUNT_TYPE;
    note: string | null;
    imageUri: string | null;
    total: number;
    date_of_create: number;
    last_update: number;
}