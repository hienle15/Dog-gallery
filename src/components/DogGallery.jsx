// src/components/DogGallery.jsx

// Import các hook cần thiết từ React
import React, { useEffect } from 'react';

// Import các custom hook để tương tác với Redux store
import { useAppDispatch, useAppSelector } from '../App/hooks';

// Import các selector và action từ slice quản lý ảnh mèo (dogsSlice)
import {
  selectDogImages,       // Selector để lấy danh sách ảnh mèo
  selectDogImagesStatus, // Selector để lấy trạng thái tải ảnh (loading, succeeded, failed)
  selectDogImagesError,  // Selector để lấy thông báo lỗi nếu có
  getRandomDogImages,    // Action creator để lấy ảnh mèo ngẫu nhiên
} from '../features/dogs/dogsSlice';

// Import component nút yêu thích
import FavoriteButton from './FavoriteButton';

const DogGallery = () => {
  // Lấy hàm `dispatch` để gửi các actions đến Redux store
  const dispatch = useAppDispatch();

  // Lấy dữ liệu từ Redux store bằng các selector
  const images = useAppSelector(selectDogImages);         // Danh sách các ảnh mèo đang hiển thị
  const status = useAppSelector(selectDogImagesStatus);   // Trạng thái tải ảnh
  const error = useAppSelector(selectDogImagesError);     // Thông báo lỗi khi tải ảnh

  // `useEffect` hook để thực hiện các side effects sau khi render.
  useEffect(() => {
    // Dispatch action `getRandomDogImages()` khi component được mount lần đầu.
    // Điều này đảm bảo rằng khi người dùng truy cập trang thư viện,
    // một bộ ảnh mèo ngẫu nhiên sẽ được tải và hiển thị ngay lập tức.
    dispatch(getRandomDogImages());
  }, [dispatch]); // Dependency array: effect sẽ chỉ chạy lại nếu `dispatch` thay đổi (thường chỉ chạy một lần khi mount).

  return (
    // Container chính của gallery ảnh, với padding dọc.
    <div className="py-6">
      {/* Hiển thị thông báo "Đang tải ảnh..." khi trạng thái là 'loading' */}
      {status === 'loading' && <p className="text-center text-gray-600">Đang tải ảnh...</p>}

      {/* Hiển thị thông báo lỗi khi có lỗi và trạng thái là 'failed' */}
      {error && <p className="text-center text-red-500">Lỗi khi tải ảnh: {error}</p>}

      {/* Lưới hiển thị ảnh với responsive layout sử dụng Tailwind CSS */}
      {/* `grid grid-cols-1`: 1 cột trên màn hình nhỏ nhất */}
      {/* `sm:grid-cols-2`: 2 cột trên màn hình sm (small) trở lên */}
      {/* `md:grid-cols-3`: 3 cột trên màn hình md (medium) trở lên */}
      {/* `lg:grid-cols-4`: 4 cột trên màn hình lg (large) trở lên */}
      {/* `gap-6`: Khoảng cách giữa các ô trong lưới */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Duyệt qua mảng `images` và hiển thị từng ảnh */}
        {images.map((image) => (
          // Mỗi ảnh được đặt trong một div riêng
          <div
            key={image.id} // Key duy nhất cho mỗi item trong danh sách, quan trọng cho hiệu suất của React
            // Các lớp Tailwind CSS để tạo kiểu cho khung ảnh:
            // `relative`: Cho phép định vị tuyệt đối các phần tử con (như nút yêu thích).
            // `rounded-lg`: Bo tròn góc của khung ảnh.
            // `overflow-hidden`: Đảm bảo nội dung (ảnh) không tràn ra ngoài khung bo tròn.
            // `shadow-md`: Thêm bóng đổ vừa phải.
            // `hover:shadow-lg`: Tăng kích thước bóng khi di chuột qua.
            // `transition duration-300`: Tạo hiệu ứng chuyển tiếp mượt mà cho các thay đổi CSS.
            className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
          >
            {/* Thẻ `img` hiển thị ảnh mèo */}
            <img
              className="w-full h-64 object-cover" // `w-full`: Chiếm toàn bộ chiều rộng của div cha.
                                                  // `h-64`: Chiều cao cố định là 64 đơn vị Tailwind (khoảng 16rem).
                                                  // `object-cover`: Đảm bảo ảnh lấp đầy khung mà không bị méo, cắt bớt nếu cần.
              src={image.url} // Đường dẫn URL của ảnh
              alt="Cat"       // Thuộc tính alt cho ảnh, quan trọng cho SEO và khả năng tiếp cận
            />
            {/* Container cho nút yêu thích, định vị tuyệt đối ở góc trên bên phải của ảnh */}
            <div className="absolute top-2 right-2">
              {/* Component FavoriteButton, truyền đối tượng `image` vào làm prop */}
              <FavoriteButton image={image} />
            </div>
          </div>
        ))}
      </div>

      {/* Hiển thị thông báo "Không có ảnh nào." nếu không có ảnh và đã tải xong thành công */}
      {images.length === 0 && status === 'succeeded' && (
        <p className="text-center text-gray-600 mt-4">Không có ảnh nào.</p>
      )}
    </div>
  );
};

export default DogGallery;
