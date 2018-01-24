// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import actionCreatorFactory from 'typescript-fsa';
import { IStoredAccount } from 'apla/storage';
import { INotificationsMessage } from 'apla/socket';

const actionCreator = actionCreatorFactory('socket');
export const connect = actionCreator.async<{ userID: string, socketToken: string, timestamp: string }, object, void>('CONNECT');
export const subscribe = actionCreator.async<{ account: IStoredAccount }, any, string>('SUBSCRIBE');
export const unsubscribe = actionCreator.async<{ account: IStoredAccount }, void, void>('UNSUBSCRIBE');
export const setNotificationsCount = actionCreator<INotificationsMessage>('SET_NOTIFICATIONS_COUNT');
export const getNotificationsCount = actionCreator<{ ids: { id: string, ecosystem: string }[] }>('GET_NOTIFICATIONS_COUNT');