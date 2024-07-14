import IProject from "./accounts";
import IProfile from "./profile";
import ITotal from "./total";
import ITransaction from "./transactions";

export default interface IStore {
    accounts: IAccountReducer;
    transactions: ITransactionReducer;
    profile: IProfileReducer;
    totalMonth: ITotalReducer;
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

export interface ITotalReducer {
    loading: boolean,
    error: null | string,
    data: ITotal;
}