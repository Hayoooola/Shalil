import IProject from "./accounts";
import ITransaction from "./transactions";

export default interface IStore {
    accounts: IAccountReducer;
    transactions: ITransactionReducer;
}

export interface IAccountReducer {
    loading: boolean,
    error: null | string,
    data: IProject[];
}

export interface ITransactionReducer {
    loading: boolean,
    error: null | string,
    data: ITransaction[];
}