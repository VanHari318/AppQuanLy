import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, deleteProduct, setEditingProduct, toggleProductStatus }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="bg-dark text-white">Danh Sách Sản Phẩm</h2>
        
        {products.length === 0 ? (
          <p className="text-muted">Không có sản phẩm nào</p>
        ) : (
          <div className="list-group">
            {products.map(product => (
              <ProductItem
                key={product.id}
                product={product}
                deleteProduct={deleteProduct}
                setEditingProduct={setEditingProduct}
                toggleProductStatus={toggleProductStatus}
              />
            ))}
          </div>
        )}
    
      </div>
    </div>
  );
};

export default ProductList;