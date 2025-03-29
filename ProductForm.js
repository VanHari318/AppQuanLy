import React, { useState, useEffect } from 'react';

const ProductForm = ({ addProduct, editingProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    status: 'Còn hàng'
  });
  const [errors, setErrors] = useState({});

  // Khi `editingProduct` thay đổi, cập nhật state `product`
  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    } else {
      setProduct({
        name: '',
        description: '',
        price: '',
        status: 'Còn hàng'
      });
    }
  }, [editingProduct]);

  const validate = () => {
    const newErrors = {};
    
    if (!product.name.trim()) {
      newErrors.name = 'Tên sản phẩm không được để trống';
    } else if (product.name.length > 30) {
      newErrors.name = 'Tên sản phẩm không quá 30 kí tự';
    }
    
    if (!product.description.trim()) {
      newErrors.description = 'Mô tả không được để trống';
    }
    
    if (!product.price) {
      newErrors.price = 'Giá không được để trống';
    } else if (isNaN(product.price) || Number(product.price) < 0) {
      newErrors.price = 'Giá phải là số không âm';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    addProduct(product);
    
    setProduct({
      name: '',
      description: '',
      price: '',
      status: 'Còn hàng'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
    console.log(e.target.value);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title text-white bg-success p-3 rounded">
          {editingProduct ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên Sản Phẩm</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Nhập tên sản phẩm"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Mô Tả</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Nhập mô tả sản phẩm"
              rows="3"
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Giá</label>
            <input
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Nhập giá sản phẩm"
              min="0"
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Trạng Thái</label>
            <select
              className="form-select"
              name="status"
              value={product.status}
              onChange={handleChange}
            >
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>
          
          <button type="submit" className="btn btn-success text-white w-100">
            {editingProduct ? 'Lưu Thay Đổi' : 'Thêm Sản Phẩm'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;