// src/features/dogs/favoritesSlice.js

// Import hàm `createSlice` từ Redux Toolkit.
// Hàm này là công cụ chính để định nghĩa một "slice" của Redux state.
import { createSlice } from '@reduxjs/toolkit';

// Định nghĩa trạng thái ban đầu (initialState) cho slice 'favorites'.
// Đây là cấu trúc dữ liệu mà slice này sẽ quản lý trong Redux store.
const initialState = {
  favorites: [], // Mảng chứa danh sách các ảnh mèo đã được thêm vào mục yêu thích. Ban đầu là rỗng.
};

// `createSlice` tạo ra reducer logic và các action creators tương ứng cho slice này.
const favoritesSlice = createSlice({
  name: 'favorites', // Tên của slice. Sẽ được dùng làm tiền tố cho các action types.
  initialState, // Trạng thái ban đầu của slice.
  reducers: {
    // Reducers đồng bộ: Nơi bạn định nghĩa các hàm để thay đổi trạng thái trực tiếp.
    // Các hàm này sẽ tự động tạo ra các "action creators" tương ứng.

    // Reducer để thêm một ảnh vào danh sách yêu thích.
    // `state`: Trạng thái hiện tại của slice 'favorites'.
    // `action`: Đối tượng action được dispatch, chứa `payload` (dữ liệu ảnh cần thêm).
    addToFavorites: (state, action) => {
      // Kiểm tra xem ảnh đã tồn tại trong danh sách yêu thích chưa để tránh thêm trùng lặp.
      // `action.payload` là đối tượng ảnh được truyền vào khi dispatch action này.
      if (!state.favorites.find(item => item.id === action.payload.id)) {
        // Nếu ảnh chưa có, thêm ảnh mới vào cuối mảng `favorites`.
        // Redux Toolkit sử dụng Immer, cho phép chúng ta "mutate" (thay đổi trực tiếp) state
        // một cách an toàn trong reducers, mặc dù thực tế nó tạo ra một bản sao mới.
        state.favorites.push(action.payload);
      }
    },
    // Reducer để xóa một ảnh khỏi danh sách yêu thích.
    // `state`: Trạng thái hiện tại của slice 'favorites'.
    // `action`: Đối tượng action được dispatch, chứa `payload` (dữ liệu ảnh cần xóa).
    removeFromFavorites: (state, action) => {
      // Lọc ra tất cả các ảnh mà ID của chúng KHÔNG khớp với ID của ảnh cần xóa.
      // Điều này tạo ra một mảng `favorites` mới không chứa ảnh đã xóa.
      state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
    },
  },
});

// Export các action creators được tạo tự động từ các reducers.
// Ví dụ: `addToFavorites` và `removeFromFavorites` có thể được dispatch từ các component.
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

// Export một "selector function".
// Selector này giúp các component dễ dàng truy cập toàn bộ mảng `favorites` từ Redux store.
export const selectFavorites = (state) => state.favorites.favorites;

// Export reducer mặc định của slice này.
// Reducer này sẽ được kết hợp vào Redux store chính trong file `store.js`.
export default favoritesSlice.reducer;
