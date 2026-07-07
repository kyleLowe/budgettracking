import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors/NotFoundError';
import { Types } from 'mongoose';
import * as TransactionServices from '../services/TransactionServices';
import { NotAcceptableError } from '../errors/NotAcceptable';
import * as UserService from '../services/UserServices';
import * as CategoryService from '../services/CategoryServices';

export const getTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _transactionId = req.params.transactionId as string;
        if (!_transactionId) {
            throw new NotAcceptableError('Transaction ID is required');
        }
        const transactionId = new Types.ObjectId(_transactionId);
        const transaction = await TransactionServices.getTransaction(transactionId);
        if (!transaction) {
            throw new NotFoundError('Transaction not found');
        }
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    };
};

export const getTransactionsByDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { startDate, endDate } = req.body;
        if (!startDate || !endDate) {
            throw new NotAcceptableError('Start date and end date are required');
        };
        const transactions = await TransactionServices.getTransactionsByDate(new Date(startDate), new Date(endDate));
        if (!transactions || transactions.length === 0) {
            throw new NotFoundError('No transactions found for the specified date range');
        }
        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
};

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Request body:', req.body);
        const { userId, amount, currency, categoryId, paymentMethod, store, name, note, paymentType, date } = req.body;
        if (!userId || !amount || !currency || !categoryId || !paymentMethod || !name || !store ||!paymentType || !date) {
            throw new NotAcceptableError('Missing required fields');
        }
        const user = await UserService.getUser(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        const category = await CategoryService.getCategory(categoryId);
        if (!category) {
            throw new NotFoundError('Category not found');
        }
        const transaction = await TransactionServices.createTransaction(userId, amount, currency, categoryId, paymentMethod, store, name, note, paymentType, new Date(date));
        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }  
};

export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _transactionId = req.params.transactionId as string;
        if (!_transactionId) {
            throw new NotFoundError('Transaction ID is required');
        }
        const transactionId = new Types.ObjectId(_transactionId);
        const transaction = await TransactionServices.deleteTransaction(transactionId);
        if (!transaction) {
            throw new NotFoundError('Transaction not found');
        }
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};

export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _transactionId = req.params.transactionId as string;
        if (!_transactionId) {
            throw new NotAcceptableError('Transaction ID is required');
        }
        const transactionId = new Types.ObjectId(_transactionId);
        const { userId, amount, currency, categoryId, paymentMethod, store, name, note, paymentType, date } = req.body;
        const transaction = await TransactionServices.updateTransaction(transactionId, userId, amount, currency, categoryId, paymentMethod, store, name, note, paymentType, new Date(date));
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};
