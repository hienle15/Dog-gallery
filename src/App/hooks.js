import { useDispatch, useSelector } from "react-redux";
// Xóa dòng import { Store } from '.store'; vì không cần thiết

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;