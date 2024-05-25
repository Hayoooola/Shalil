import IProject from "./projects";

export default interface IStore {
    projects: IProjectReducer;
}

export interface IProjectReducer {
    loading: boolean,
    error: null | string,
    data: IProject[];
}