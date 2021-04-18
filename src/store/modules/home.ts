import { HomeState, RootState } from "@/typings";
import { AxiosInstance } from "axios";
import { Action, Mutation, Module } from "vuex";
import * as Types from "../constants";

const createHome = (request: AxiosInstance): Module<HomeState, RootState> => {
  const state: HomeState = {
    name: "zhangsan",
    test: "",
  };

  const mutations: Record<string, Mutation<HomeState>> = {
    [Types.CHANGE_NAME]: (state, payload: string) => {
      state.name = payload;
    },
    [Types.CHANGE_TEST]: (state, payload: string) => {
      state.test = payload;
    },
  };

  const actions: Record<string, Action<HomeState, RootState>> = {
    [Types.CHANGE_TEST]: async ({ commit }) => {
      const payload = await new Promise((resolve) => {
        setTimeout(() => {
          resolve("finish");
        }, 1000);
      });
      commit(Types.CHANGE_TEST, payload);
    },
  };

  const home: Module<HomeState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  return home;
};

export default createHome;
