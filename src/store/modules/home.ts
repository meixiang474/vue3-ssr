import { HomeState, RootState } from "@/typings";
import { AxiosInstance } from "axios";
import { Action, Mutation, Module } from "vuex";
import * as Types from "../constants";

const createHome = (request: AxiosInstance): Module<HomeState, RootState> => {
  const state: HomeState = {
    name: "zhangsan",
  };

  const mutations: Record<string, Mutation<HomeState>> = {
    [Types.CHANGE_NAME]: (state, payload: string) => {
      state.name = payload;
    },
  };

  const actions: Record<string, Action<HomeState, RootState>> = {};

  const home: Module<HomeState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  return home;
};

export default createHome;
