// src/features/dogs/dogsSlice.js

// Import các hàm cần thiết từ Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Import các hàm gọi API liên quan đến ảnh mèo từ file dogsAPI.js
import { fetchDogImagesByBreed, fetchRandomDogImages } from './dogsAPI';

// Định nghĩa trạng thái ban đầu (initialState) cho slice này.
// Đây là cấu trúc dữ liệu mà slice 'dogs' sẽ quản lý trong Redux store.
const initialState = {
    images: [], // Mảng chứa danh sách các ảnh mèo. Ban đầu là rỗng.
    status: 'idle', // Trạng thái của việc gọi API:
                    // 'idle': Trạng thái ban đầu, chưa có yêu cầu nào được gửi.
                    // 'loading': Đang gửi yêu cầu API và chờ phản hồi.
                    // 'succeeded': Yêu cầu API đã thành công và dữ liệu đã được nhận.
                    // 'failed': Yêu cầu API đã thất bại (có lỗi xảy ra).
    error: null // Lưu trữ thông báo lỗi nếu yêu cầu API thất bại. Ban đầu là null.
};

// `createAsyncThunk` để xử lý logic bất đồng bộ khi lấy ảnh mèo theo ID giống.
export const getDogImagesByBreed = createAsyncThunk(
    // Tên action type.
    'dogs/fetchDogImagesByBreed',
    // Hàm async này sẽ được thực thi khi action `getDogImagesByBreed` được dispatch.
    async (breedID) => {
        const response = await fetchDogImagesByBreed(breedID); // Gọi hàm API để lấy ảnh theo ID giống.
        return response; // Giá trị trả về sẽ là payload của action `fulfilled`.
    }
);

// `createAsyncThunk` để xử lý logic bất đồng bộ khi lấy ảnh mèo ngẫu nhiên.
export const getRandomDogImages = createAsyncThunk(
    // Tên action type.
    'dogs/fetchRandomDogImages',
    // Hàm async này sẽ được thực thi khi action `getRandomDogImages` được dispatch.
    async () => {
        const response = await fetchRandomDogImages(); // Gọi hàm API để lấy ảnh ngẫu nhiên.
        return response; // Giá trị trả về sẽ là payload của action `fulfilled`.
    }
);

// `createSlice` là hàm cốt lõi của Redux Toolkit để định nghĩa một "slice" của Redux state.
// Slice này quản lý trạng thái của các ảnh mèo.
const dogsSlice = createSlice({
    name: 'dogs', // Tên của slice.
    initialState, // Trạng thái ban đầu.
    reducers: {
        // Reducers đồng bộ: Slice này hiện không có reducers đồng bộ nào.
    },
    extraReducers: (builder) => {
        // `extraReducers` cho phép slice này "lắng nghe" và phản ứng với các actions được tạo ra bởi `createAsyncThunk`.
        builder
            // Xử lý khi action `getDogImagesByBreed` đang trong trạng thái "pending".
            .addCase(getDogImagesByBreed.pending, (state) => {
                state.status = 'loading'; // Cập nhật trạng thái thành 'loading'.
            })
            // Xử lý khi action `getDogImagesByBreed` đã "fulfilled".
            .addCase(getDogImagesByBreed.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Cập nhật trạng thái thành 'succeeded'.
                state.images = action.payload; // Cập nhật mảng `images` với dữ liệu ảnh nhận được từ API.
            })
            // Xử lý khi action `getDogImagesByBreed` bị "rejected".
            .addCase(getDogImagesByBreed.rejected, (state, action) => {
                state.status = 'failed'; // Cập nhật trạng thái thành 'failed'.
                state.error = action.error.message; // Lưu thông báo lỗi.
            })
            // Xử lý khi action `getRandomDogImages` đang trong trạng thái "pending".
            .addCase(getRandomDogImages.pending, (state) => {
                state.status = 'loading'; // Cập nhật trạng thái thành 'loading'.
            })
            // Xử lý khi action `getRandomDogImages` đã "fulfilled".
            .addCase(getRandomDogImages.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Cập nhật trạng thái thành 'succeeded'.
                state.images = action.payload; // Cập nhật mảng `images` với dữ liệu ảnh ngẫu nhiên nhận được từ API.
            })
            // Xử lý khi action `getRandomDogImages` bị "rejected".
            .addCase(getRandomDogImages.rejected, (state, action) => {
                state.status = 'failed'; // Cập nhật trạng thái thành 'failed'.
                state.error = action.error.message; // Lưu thông báo lỗi.
            });
    }
});

// Export các "selector functions".
// Các selector là các hàm nhỏ giúp các component dễ dàng trích xuất các phần cụ thể của state từ Redux store.
export const selectDogImages = (state) => state.dogs.images; // Lấy toàn bộ mảng ảnh.
export const selectDogImagesStatus = (state) => state.dogs.status; // Lấy trạng thái của ảnh (loading, succeeded, v.v.).
export const selectDogImagesError = (state) => state.dogs.error; // Lấy thông báo lỗi nếu có.

// Export reducer mặc định của slice này.
// Reducer này sẽ được kết hợp vào Redux store chính trong file `store.js`.
export default dogsSlice.reducer;
