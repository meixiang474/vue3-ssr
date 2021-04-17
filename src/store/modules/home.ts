import { HomeState, RootState } from "@/typings";
import { Action, Mutation, Module } from "vuex";
import * as Types from "../constants";

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

export default home;
