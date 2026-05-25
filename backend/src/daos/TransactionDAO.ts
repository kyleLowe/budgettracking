import { Types } from 'mongoose';
import Transaction from '../models/Transaction';

export const getTransactionByID = async (_transactionID: Types.ObjectId | undefined) => {
    const transaction = await Transaction.findById(_transactionID);
    return transaction;
};

export const getTransactionsByDate = async (_startDate: Date, _endDate: Date) => {
    const transactions = await Transaction.find({
        date: {
            $gte: _startDate,
            $lte: _endDate
        }
    });
    return transactions;
};

export const createTransaction = async (_userId: Types.ObjectId, amount: number, currency: Types.ObjectId, category: Types.ObjectId, paymentMethod: string, store: string, name: string, note: string) => {
    const transaction = new Transaction({
        userId: _userId,
        amount: amount,
        currency: currency,
        category: category,
        paymentMethod: paymentMethod,
        store: store,
        name: name,
        note: note
    });
    await transaction.save()
    return transaction;
};

export const deleteTransaction = async (_transactionID: Types.ObjectId | undefined) => {
    const transaction = await Transaction.findByIdAndDelete(_transactionID);
    return transaction;
};

export const updateTransaction = async (_transactionID: Types.ObjectId | undefined, _userId: Types.ObjectId | undefined, amount: number, currency: Types.ObjectId, category: Types.ObjectId, paymentMethod: string, store: string, name: string, note: string) => {
    const transaction = await Transaction.findByIdAndUpdate(_transactionID, {
        userId: _userId,
        amount: amount,
        currency: currency,
        category: category,
        paymentMethod: paymentMethod,
        store: store,
        name: name,
        note: note
    });
    return transaction;
};