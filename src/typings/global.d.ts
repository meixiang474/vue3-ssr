import { RootState } from ".";
export declare global {
  interface Window {
    context: {
      state: RootState;
    };
  }
}
