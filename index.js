class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

const myAccount = new Account('snow-patrol');
const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
const t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 1:', t1);
console.log('Transaction 2:', t2);
console.log('Transaction 3:', t3);
console.log('Balance:', myAccount.balance);

const t4 = new Withdrawal(50.25, myAccount);
t4.commit();
console.log('Transaction 4:', t4);

const t5 = new Withdrawal(9.99, myAccount);
t5.commit();
console.log('Transaction 5:', t5);

console.log('Balance:', myAccount.balance);
