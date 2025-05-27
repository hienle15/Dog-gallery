// src/features/breeds/breedsSlice.js

// Import các hàm cần thiết từ Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import hàm fetchBreeds từ file breedsAPI.js
// Hàm này sẽ chịu trách nhiệm gọi API để lấy dữ liệu về các giống mèo.
import { fetchBreeds } from './breedsAPI';

// Định nghĩa trạng thái ban đầu (initialState) cho slice này.
// Đây là cấu trúc dữ liệu mà slice 'breeds' sẽ quản lý trong Redux store.
const initialState = {
    breeds: [], // Mảng chứa danh sách các giống mèo. Ban đầu là rỗng.
    status: 'idle', // Trạng thái của việc gọi API:
                    // 'idle': Trạng thái ban đầu, chưa có yêu cầu nào được gửi.
                    // 'loading': Đang gửi yêu cầu API và chờ phản hồi.
                    // 'succeeded': Yêu cầu API đã thành công và dữ liệu đã được nhận.
                    // 'failed': Yêu cầu API đã thất bại (có lỗi xảy ra).
    error: null // Lưu trữ thông báo lỗi nếu yêu cầu API thất bại. Ban đầu là null.
};

// `createAsyncThunk` là một hàm từ Redux Toolkit giúp xử lý các logic bất đồng bộ (như gọi API).
// Nó tạo ra một "thunk" (một hàm trả về một hàm) để dispatch các action dựa trên vòng đời của một promise (pending, fulfilled, rejected).
export const getBreeds = createAsyncThunk(
    // Tên action type. Redux Toolkit sẽ tạo ra các action types như 'breeds/fetchBreeds/pending', 'breeds/fetchBreeds/fulfilled', 'breeds/fetchBreeds/rejected'.
    'breeds/fetchBreeds',
    // Hàm async này sẽ được thực thi khi action `getBreeds` được dispatch.
    async () => {
        const response = await fetchBreeds(); // Gọi hàm fetchBreeds để lấy dữ liệu.
        return response; // Giá trị trả về từ hàm này sẽ trở thành `action.payload` của action `fulfilled`.
    }
);

// `createSlice` là hàm cốt lõi của Redux Toolkit để định nghĩa một "slice" của Redux state.
// Một slice bao gồm: tên, trạng thái ban đầu, các reducers đồng bộ, và các extraReducers để xử lý actions từ các async thunks.
const breedsSlice = createSlice({
    name: 'breeds', // Tên của slice. Sẽ được dùng làm tiền tố cho các action types được tạo ra.
    initialState, // Trạng thái ban đầu của slice này.
    reducers: {
        // Reducers đồng bộ: Nơi bạn định nghĩa các hàm để thay đổi trạng thái trực tiếp.
        // Slice này hiện không có reducers đồng bộ nào, vì chúng ta chỉ xử lý các thay đổi trạng thái từ API calls.
    },
    extraReducers: (builder) => {
        // `extraReducers` cho phép slice này "lắng nghe" và phản ứng với các actions được tạo ra bởi `createAsyncThunk`
        // (hoặc các actions từ các slice khác).
        builder
            // Xử lý khi action `getBreeds` đang trong trạng thái "pending" (đang chờ phản hồi API).
            .addCase(getBreeds.pending, (state) => {
                state.status = 'loading'; // Cập nhật trạng thái thành 'loading'.
            })
            // Xử lý khi action `getBreeds` đã "fulfilled" (API call thành công).
            .addCase(getBreeds.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Cập nhật trạng thái thành 'succeeded'.
                state.breeds = action.payload; // Cập nhật mảng `breeds` với dữ liệu nhận được từ API (action.payload).
            })
            // Xử lý khi action `getBreeds` bị "rejected" (API call thất bại).
            .addCase(getBreeds.rejected, (state, action) => {
                state.status = 'failed'; // Cập nhật trạng thái thành 'failed'.
                state.error = action.error.message; // Lưu thông báo lỗi vào state.
            });
    }
});

// Export các "selector functions".
// Các selector là các hàm nhỏ giúp các component dễ dàng trích xuất các phần cụ thể của state từ Redux store.
// Việc này giúp component không cần biết chi tiết về cấu trúc của state.
export const selectAllBreeds = (state) => state.breeds.breeds; // Lấy toàn bộ mảng breeds.
export const selectBreedsStatus = (state) => state.breeds.status; // Lấy trạng thái của breeds (loading, succeeded, v.v.).
export const selectBreedsError = (state) => state.breeds.error; // Lấy thông báo lỗi nếu có.

// Export reducer mặc định của slice này.
// Reducer này sẽ được kết hợp vào Redux store chính trong file `store.js`.
export default breedsSlice.reducer;
