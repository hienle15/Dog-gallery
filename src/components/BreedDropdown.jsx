// src/components/BreedDropdown.jsx

import React, { useEffect } from 'react';
import { Select, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import {
  getBreeds,
  selectAllBreeds,
  selectBreedsStatus,
  selectBreedsError
} from '../features/breeds/breedsSlice';
import { getDogImagesByBreed } from '../features/dogs/dogsSlice';

const { Option } = Select;

const BreedDropdown = () => {
  const dispatch = useAppDispatch();
  const breeds = useAppSelector(selectAllBreeds);
  const status = useAppSelector(selectBreedsStatus);
  const error = useAppSelector(selectBreedsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getBreeds());
    }
  }, [status, dispatch]);

  const handleChange = (breedId) => {
    if (breedId) {
      dispatch(getDogImagesByBreed(breedId));
    } else {
      // Bạn có thể dispatch(getRandomDogImages()) nếu có logic cho ảnh random
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor="breed" className="block text-gray-700 text-sm font-bold mb-2">
        Chọn giống chó:
      </label>

      <Select
        showSearch
        allowClear
        placeholder="Tất cả giống chó"
        onChange={handleChange}
        loading={status === 'loading'}
        className="w-full sm:w-72"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {/* Render breed options nếu fetch thành công */}
        {status === 'succeeded' &&
          breeds.map((breed) => (
            <Option key={breed.id} value={breed.id}>
              {breed.name}
            </Option>
          ))}

        {/* Hiển thị lỗi nếu có */}
        {status === 'failed' && (
          <Option disabled key="error">
            ⚠️ Lỗi khi tải giống chó
          </Option>
        )}
      </Select>

      {/* Loading trạng thái ngoài select (tùy chọn) */}
      {status === 'loading' && (
        <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
          <Spin size="small" /> Đang tải danh sách giống...
        </div>
      )}
    </div>
  );
};

export default BreedDropdown;
