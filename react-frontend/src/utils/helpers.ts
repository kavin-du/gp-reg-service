import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';
import base64 from 'base-64';
import { APICallStatus } from './constants';
import { TokenData } from "./types";

export const getUser = (): TokenData => {
  const userData: TokenData = JSON.parse(localStorage.getItem('user') as string);
  return userData;
}

export const checkAuth = (): boolean => {
  const accessToken = localStorage.getItem('access_token');
  if(!accessToken) {
    return false;
  }
  const payload = JSON.parse(
    base64.decode(accessToken.split('.')[1])
  );
  const expiry = payload.exp;
  return Math.floor(new Date().getTime() / 1000) < expiry;
}

export const logOut = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.reload();
}

export const addBuilderCase = (
  builder: ActionReducerMapBuilder<any>, 
  thunk: AsyncThunk<any, any, any>,
  updateEntities: boolean = false
  ) => {
    builder 
      .addCase(thunk.fulfilled, (state, action) => {
        if(updateEntities) {
          state.entities = action.payload;
          state.status = APICallStatus.SUCCESS;
        } 
        // if there is nothing to update, then it is a create, put, delete call
        // in that case, we need to to refresh all appointments again
        else state.status = APICallStatus.FORCE_REFETCH;
      })
      .addCase(thunk.pending, (state, _) => {
        state.status = APICallStatus.LOADING;
      })
      .addCase(thunk.rejected, (state, action: any) => {
        state.status = APICallStatus.FAILED;
        state.error = action.payload as string ?? action.error.message;
      });
}