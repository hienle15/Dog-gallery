// src/components/FavoriteButton.jsx

// Import hook `React` để sử dụng các tính năng của React.
import React from 'react';

// Import các custom hook `useAppDispatch` và `useAppSelector` để tương tác với Redux store.
import { useAppDispatch, useAppSelector } from '../App/hooks';

// Import các action creators (`addToFavorites`, `removeFromFavorites`)
// và selector (`selectFavorites`) từ slice quản lý danh sách yêu thích (favoritesSlice).
import { addToFavorites, removeFromFavorites, selectFavorites } from '../features/dogs/favoritesSlice';

// Import các component và icon từ thư viện Font Awesome để hiển thị biểu tượng trái tim.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';   // Icon trái tim đã tô (solid)
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'; // Icon trái tim rỗng (regular)

// Import thư viện `react-toastify` để hiển thị thông báo "toast".
import { toast } from 'react-toastify';
// Import CSS của `react-toastify` để các thông báo có kiểu dáng.
import 'react-toastify/dist/ReactToastify.css';

// Định nghĩa component functional `FavoriteButton`.
// Component này nhận một prop là `image` (đối tượng ảnh mèo).
const FavoriteButton = ({ image }) => {
  // Lấy hàm `dispatch` từ Redux store để gửi các actions.
  const dispatch = useAppDispatch();

  // Lấy danh sách các ảnh yêu thích hiện tại từ Redux store bằng selector `selectFavorites`.
  const favorites = useAppSelector(selectFavorites);

  // Kiểm tra xem ảnh hiện tại (`image`) có trong danh sách `favorites` hay không.
  // `some()` sẽ trả về `true` nếu tìm thấy bất kỳ phần tử nào có `id` khớp với `image.id`.
  const isFavorite = favorites.some(fav => fav.id === image.id);

  // Hàm xử lý khi nút yêu thích được click.
  const handleFavoriteClick = () => {
    // Nếu ảnh đã là yêu thích (`isFavorite` là true):
    if (isFavorite) {
      // Dispatch action `removeFromFavorites` để xóa ảnh khỏi danh sách yêu thích.
      // Truyền đối tượng `image` làm payload.
      dispatch(removeFromFavorites(image));
      // Hiển thị thông báo cảnh báo (warn) bằng `react-toastify`.
      toast.error('Đã xóa khỏi yêu thích!');
    } else {
      // Nếu ảnh chưa là yêu thích (`isFavorite` là false):
      // Dispatch action `addToFavorites` để thêm ảnh vào danh sách yêu thích.
      // Truyền đối tượng `image` làm payload.
      dispatch(addToFavorites(image));
      // Hiển thị thông báo thành công (success) bằng `react-toastify`.
      toast.success('Đã thêm vào yêu thích!');
    }
  };

  return (
    // Nút (button) hiển thị biểu tượng trái tim.
    <button
      onClick={handleFavoriteClick} // Gắn hàm xử lý sự kiện click vào nút.
      // Các lớp Tailwind CSS để tạo kiểu cho nút:
      // `bg-white`: Nền trắng.
      // `bg-opacity-75`: Độ trong suốt 75%.
      // `rounded-full`: Bo tròn hoàn toàn để tạo hình tròn.
      // `p-2`: Padding 2 đơn vị xung quanh icon.
      // `shadow-md`: Thêm bóng đổ vừa phải.
      // `hover:bg-opacity-90`: Tăng độ trong suốt lên 90% khi di chuột qua.
      className="bg-white bg-opacity-75 rounded-full p-2 shadow-md hover:bg-opacity-90"
    >
      {/* Component `FontAwesomeIcon` để hiển thị icon trái tim. */}
      {/* `icon`: Chọn icon dựa trên trạng thái `isFavorite`. Nếu là yêu thích, dùng `faHeartSolid`, ngược lại dùng `faHeartRegular`. */}
      {/* `className`: Các lớp Tailwind CSS để tạo kiểu cho icon: */}
      {/* `text-red-500`: Màu đỏ cho icon. */}
      {/* `${isFavorite ? '' : 'opacity-70'}`: Nếu không phải yêu thích, giảm độ mờ của icon xuống 70%. */}
      {/* `size="lg"`: Kích thước lớn cho icon. */}
      <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} className={`text-red-500 ${isFavorite ? '' : 'opacity-70'}`} size="lg" />
    </button>
  );
};

export default FavoriteButton;
