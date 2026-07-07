import {Types} from 'mongoose';
import * as TransactionDAO from '../daos/TransactionDAO';
import { NotAcceptableError } from '../errors/NotAcceptable';
import { paymentType } from '../models/Transaction';

export const getTransaction = async ( transactionID: Types.ObjectId) => {
    const transaction = await TransactionDAO.getTransactionByID(transactionID)
    return transaction
};

export const getTransactionsByDate = async ( startDate: Date, endDate: Date) => {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new NotAcceptableError('Start date and end date must be valid Date objects');
    }
    const currentDate = new Date();
    if (startDate > currentDate || endDate > currentDate) {
        throw new NotAcceptableError('Start date and end date cannot be in the future');
    }
    if (startDate > endDate) {
        throw new NotAcceptableError('Start date cannot be after end date');
    }
    const transactions = await TransactionDAO.getTransactionsByDate(startDate, endDate)
    return transactions
};

export const createTransaction = async (userId: Types.ObjectId, amount: number, currency: string, category: Types.ObjectId, paymentMethod: string, store: string, name: string, note: string, paymentType: paymentType, date: Date) => {
    if (amount <= 0) {
        throw new NotAcceptableError('Amount must be greater than zero');
    }
    const transaction = await TransactionDAO.createTransaction(userId, amount, currency, category, paymentMethod, store, name, note, paymentType, date)
    return transaction
};

export const deleteTransaction = async (transactionID: Types.ObjectId) => {
    const transaction = await TransactionDAO.deleteTransaction(transactionID)
    return transaction
}

export const updateTransaction = async (transactionID: Types.ObjectId, userId: Types.ObjectId, amount: number, currency: string, category: Types.ObjectId, paymentMethod: string, store: string, name: string, note: string, paymentType: paymentType, date: Date) => {
    if (amount <= 0) {
        throw new NotAcceptableError('Amount must be greater than zero');
    }
    const transaction = await TransactionDAO.updateTransaction(transactionID, userId, amount, currency, category, paymentMethod, store, name, note, paymentType, date)
    return transaction
};
