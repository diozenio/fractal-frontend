import { create } from 'zustand';

interface AppLoadingState {
  loadingStates: Map<string, boolean>;
  isAppLoading: boolean;
  setLoadingState: (key: string, isLoading: boolean) => void;
}

export const useAppLoadingStore = create<AppLoadingState>((set) => ({
  loadingStates: new Map(),
  isAppLoading: true,
  setLoadingState: (key, isLoading) => {
    set((state) => {
      const newLoadingStates = new Map(state.loadingStates);
      newLoadingStates.set(key, isLoading);

      const newIsAppLoading = Array.from(newLoadingStates.values()).some(
        (val) => val
      );

      return {
        loadingStates: newLoadingStates,
        isAppLoading: newIsAppLoading,
      };
    });
  },
}));
