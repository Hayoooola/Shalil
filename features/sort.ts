import ITransaction from "../interfaces/transactions";


export const sortTransactions = (transactions: ITransaction[]) => [...transactions]
    .sort((a, b) => new Date(b.last_update).getTime() - new Date(a.last_update).getTime())
    .sort((a, b) => new Date(b.date_of_create).getTime() - new Date(a.date_of_create).getTime());