export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
};

export type Credential = {
  id: string;
  name: string;
  issuer: string;
  type: 'Loyalty Card' | 'Digital Certificate';
};

export type Account = {
  accountNumber: string;
  accountHolder: string;
  balance: number;
  transactions: Transaction[];
  credentials: Credential[];
};

export const userData: Account = {
  accountNumber: '150853910035',
  accountHolder: 'Muhamad Sazwan Bin Ismail',
  balance: 123.45,
  transactions: [
    { id: 'txn1', date: '2024-07-29', description: 'Toll Payment - DUKE Highway', amount: 2.50, type: 'debit' },
    { id: 'txn2', date: '2024-07-28', description: 'Parking - Mid Valley Megamall', amount: 5.00, type: 'debit' },
    { id: 'txn3', date: '2024-07-28', description: 'Reload - CIMB Clicks', amount: 50.00, type: 'credit' },
    { id: 'txn4', date: '2024-07-27', description: 'Retail - 7-Eleven', amount: 15.80, type: 'debit' },
    { id: 'txn5', date: '2024-07-26', description: 'Toll Payment - LDP Highway', amount: 1.90, type: 'debit' },
    { id: 'txn6', date: '2024-07-25', description: 'Parking - 1 Utama', amount: 4.00, type: 'debit' },
    { id: 'txn7', date: '2024-07-24', description: 'Retail - Starbucks', amount: 22.50, type: 'debit' },
    { id: 'txn8', date: '2024-07-22', description: 'Reload - Maybank2U', amount: 100.00, type: 'credit' },
  ],
  credentials: [
    { id: 'cred1', name: 'Watsons VIP Card', issuer: 'Watsons Malaysia', type: 'Loyalty Card' },
    { id: 'cred2', name: 'PLUSMiles Card', issuer: 'PLUS Malaysia Berhad', type: 'Loyalty Card' },
  ],
};
