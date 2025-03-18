import { Injectable } from '@angular/core';

import { Wallet, Transaction, Investment, Savings, } from 'src/app/models/wallet.model';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private readonly STORAGE_KEY = "wallet";
  private walletMap = new Map<string, Wallet>();
  constructor(
    private utils: UtilsService
  ) { }

  private storeWalletInLocalStorage(userId: string, wallet: Wallet): void {
    this.walletMap.set(userId, wallet);
    const usersObject = Object.fromEntries(this.walletMap);
    this.utils.setToDB(this.STORAGE_KEY, usersObject);
  }

  private getWalletFromLocalStorage(userId: string): Wallet | undefined {
    const storedWalletMap = this.utils.getFromDB(this.STORAGE_KEY);
    if (storedWalletMap) {
      // const parsedWalletMap = JSON.parse(storedWalletMap);
      this.walletMap = new Map(Object.entries(storedWalletMap));
      return this.walletMap.get(userId);
    }
    return undefined;
  }

  getWalletProfile(userId: string): Wallet | undefined {
    return this.getWalletFromLocalStorage(userId);
  }

  updateWalletProfile(userId: string, updatedWallet: Wallet): void {
    this.storeWalletInLocalStorage(userId, updatedWallet);
  }

  createWalletProfile(userId: string, wallet: Wallet): void {
    this.storeWalletInLocalStorage(userId, wallet);
  }

  initSavings() {
    return { totalAmount: 100000 }
  }

  initInvestments() {
    // add initial investments
    return []
  }

  initTransactions() {
    // add initial transactions
    return []
  }

  // initialize an empty wallet for a user
  initWallet(userId: string) {
    let newWallet = {
      userId: userId,
      savings: this.initSavings(),
      investments: this.initInvestments(),
      transactions: this.initTransactions()
    }

    this.storeWalletInLocalStorage(userId, newWallet)
  }

  getTransactions(userId: string): Transaction[] {
    let wallet = this.getWalletFromLocalStorage(userId)
    return wallet.transactions
  }

  addTransaction(userId: string, transaction: Transaction): void {
    let wallet = this.getWalletFromLocalStorage(userId);
    if (wallet) {
      wallet.transactions.push(transaction);
      this.storeWalletInLocalStorage(userId, wallet);
    }
  }

  getInvestments(userId: string): Investment[] {
    let wallet = this.getWalletFromLocalStorage(userId)
    if (wallet) {
      return wallet.investments
    } else {
      return []
    }
  }

  addInvestment(userId: string, investment: Investment): void {
    let wallet = this.getWalletFromLocalStorage(userId);
    if (wallet) {  
      wallet.investments.push(investment);
      this.storeWalletInLocalStorage(userId, wallet);
    }
  }

  updateInvestment(userId: string, investment: Investment): void {
    let wallet = this.getWalletFromLocalStorage(userId);
  }

  getSavings(userId: string): Savings {
    let wallet = this.getWalletFromLocalStorage(userId)
    console.log("getSavings for " + userId)
    console.log(wallet);
    if (wallet) {
      return wallet.savings
    } else {
      return { totalAmount: 0 }
    }
  }

  updateSavings(userId: string, newAmount: Savings): void {
    let wallet = this.getWalletFromLocalStorage(userId);
    if (wallet) {
      wallet.savings = newAmount;
      this.storeWalletInLocalStorage(userId, wallet);
    }
  }
}

