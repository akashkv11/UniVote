// stores/useStatusStore.ts
import { create } from "zustand";

type StatusState = {
  loading: boolean;
  error: string | null;
  success: string | null;
  setStatus: (status: "loading" | "error" | "success" | null) => void;
  setError: (error: string | null) => void;
  resetStatus: () => void;
};

export const useStatusStore = create<StatusState>((set) => ({
  loading: false,
  error: null,
  success: null,
  setError: (error) => set({ error }),
  resetStatus: () => set({ loading: false, error: null, success: null }),
  setStatus(status) {
    if (status === "loading") {
      set({ loading: true, error: null, success: null });
    } else if (status === "error") {
      set({ loading: false, error: "An error occurred", success: null });
    } else if (status === "success") {
      set({ loading: false, error: null, success: "Operation successful" });
    } else {
      set({ loading: false, error: null, success: null });
    }
  },
}));
