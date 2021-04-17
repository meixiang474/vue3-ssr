import { RootState, CancelState } from "@/typings";
import { Canceler } from "axios";
import { Action, Mutation, Module } from "vuex";
import * as Types from "../constants";

const createCancel = (): Module<CancelState, RootState> => {
  const state: CancelState = {
    cancels: {},
  };

  const mutations: Record<string, Mutation<CancelState>> = {
    [Types.CHNAGE_CANCELS]: (
      state,
      payload: Record<string, Canceler | null>
    ) => {
      state.cancels = payload;
    },
  };

  const actions: Record<string, Action<CancelState, RootState>> = {};

  const home: Module<CancelState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  return home;
};

export default createCancel;
