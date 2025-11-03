import type { AppDispatch, RootState } from "@/store/store";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// ✅ Typed hooks for use in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
