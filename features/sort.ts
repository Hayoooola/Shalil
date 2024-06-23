import ITransaction from "../interfaces/transactions";


export const sortTransactions = (transactions: ITransaction[]) => [...transactions].sort((a, b) => new Date(b.last_update).getTime() - new Date(a.last_update).getTime());