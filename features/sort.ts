import moment from "moment-jalaali";

import IAccount from "../interfaces/accounts";
import ITransaction from "../interfaces/transactions";


export const sortTransactions = (transactions: ITransaction[]) => [...transactions]
    .sort((a, b) => moment(b.last_update, "jYYYY/jMM/jDD_HH:mm") - moment(a.last_update, "jYYYY/jMM/jDD_HH:mm"))
    .sort((a, b) => moment(b.date_of_create, "jYYYY/jMM/jDD_HH:mm") - moment(a.date_of_create, "jYYYY/jMM/jDD_HH:mm"));

export const sortAccounts = (accounts: IAccount[]) => [...accounts]
    .sort((a, b) => moment(b.last_update, "jYYYY/jMM/jDD_HH:mm") - moment(a.last_update, "jYYYY/jMM/jDD_HH:mm"))
    .sort((a, b) => moment(b.date_of_create, "jYYYY/jMM/jDD_HH:mm") - moment(a.date_of_create, "jYYYY/jMM/jDD_HH:mm"));