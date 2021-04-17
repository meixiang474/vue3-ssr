import { Canceler } from "axios";

export interface CancelState {
  cancels: Record<string, Canceler | null>;
}
