import React from 'react';
import { Link} from "react-router-dom";
const style ={
  color:"black",
  textDecoration:"none"
}
const ProductItem = ({ product, deleteProduct, toggleProductStatus, setEditingProduct }) => {
  return (
    <div className="list-group-item">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5>{product.name}</h5>
          <p className="mb-1">{product.description}</p>
          <p className="mb-1"><strong>Giá:</strong> {product.price.toLocaleString()}đ</p>
        </div>
        <div>
          <button 
            className="btn btn-warning btn-primary me-2"
            onClick={() => toggleProductStatus(product.id)}
          >
            {product.status === 'Còn hàng' ? 'Đánh dấu, Hết hàng' : 'Đánh dấu, Còn hàng'}
          </button>
          <button 
            className="btn btn-sm btn-info me-2"
            onClick={() => setEditingProduct(product)}
          >
            <Link style={style} to="/ProductForm">Sửa</Link>
          </button>
          <button 
            className="btn btn-sm btn-danger"
            onClick={() => deleteProduct(product.id)}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;