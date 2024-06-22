import IProject from "./accounts";

export default interface IStore {
    accounts: IAccountReducer;
}

export interface IAccountReducer {
    loading: boolean,
    error: null | string,
    data: IProject[];
}