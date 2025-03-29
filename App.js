import React, { useState, useEffect } from 'react';
import ProductForm from './conponents/ProductForm';
import ProductList from './conponents/ProductList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './conponents/Layout';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load dữ liệu ban đầu (nếu có)
  useEffect(() => {
    const savedProducts = window.localStorage.getItem('products');
    if(savedProducts){
      try{
        const parsedProducts = JSON.parse(savedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Lỗi khi phân tích dữ liệu từ localStorage:', error);
      }
    }
  }, []);

  // Lưu dữ liệu vào localStorage khi có thay đổi
  useEffect(() => {
    if(products.length > 0){
      try{
        window.localStorage.setItem('products', JSON.stringify(products));
      } catch (error) {
        console.error('Lỗi khi lưu vào localStorage:', error);
      }
    }
    else{
      window.localStorage.removeItem('products');
    }
    
  }, [products]);

  const addProduct = (product) => {
    if (editingProduct) {
      // Cập nhật sản phẩm nếu đang chỉnh sửa
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...editingProduct, ...product } : p
      ));
      setEditingProduct(null); // Reset sản phẩm đang chỉnh sửa
    } else {
      // Thêm sản phẩm mới
      const newProduct = { ...product, id: Date.now() };
      setProducts([...products, newProduct]);
    }
  };

  const deleteProduct = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const toggleProductStatus = (id) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, status: product.status === 'Còn hàng' ? 'Hết hàng' : 'Còn hàng' } 
        : product
    ));
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<ProductList products={products} deleteProduct={deleteProduct} setEditingProduct={setEditingProduct} toggleProductStatus={toggleProductStatus}/>}/>
            <Route path='ProductForm' element={<ProductForm addProduct={addProduct} editingProduct={editingProduct}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;