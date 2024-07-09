import IProject from "./accounts";
import IProfile from "./profile";
import ITransaction from "./transactions";

export default interface IStore {
    accounts: IAccountReducer;
    transactions: ITransactionReducer;
    profile: IProfileReducer;
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

export interface IProfileReducer {
    loading: boolean,
    error: null | string,
    data: IProfile;
}