export interface ICommonStore {
  error: string;
  loading: boolean;
  successMessage: null | string;
  setSuccessMessage: (value: null | string) => void;
  setLoading: (value: boolean) => void;
  setError: (value: Error) => void;
}
