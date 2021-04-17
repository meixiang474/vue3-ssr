import { HomeState } from ".";
import { CancelState } from ".";
export interface RootState {
  home: HomeState;
  cancel: CancelState;
}
