import { combineReducers } from '@reduxjs/toolkit';
import { useReducer } from 'react';

export const rootReducer = combineReducers({ user: useReducer });

export type RootState = ReturnType<typeof rootReducer>;
