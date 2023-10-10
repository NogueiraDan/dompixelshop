'use client';
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  product?: Product;
}

interface FormFields {
  name: string,
  description: string,
  price: number,
  stockQty: number
}

const ProductForm = () => {
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    description: '',
    price: 0,
    stockQty: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        name: formData.name,
        price: parseFloat(formData.price.toString()),
        description: formData.description,
         stockQty: parseInt(formData.stockQty.toString(), 10),
      };
      console.log('DATA');
      console.table(data);
      const response = await fetch(`http://localhost:3000/products/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Produto Cadastrado com Sucesso!');
        setFormData({
          name: '',
          description: '',
          price: 0,
          stockQty: 0,
        });
      } else {
        console.error('Falha ao cadastrar o produto');
      }
    } catch (error) {
      console.error('Erro ao processar a requisição', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center w-[75%]">
      <label>Nome do produto</label>
      <input
        className="mb-2 h-10 p-1"
        type="text"
        placeholder="Nome"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <label>Descrição do Produto</label>
      <input
        className="mb-2 h-10 p-1"
        type="text"
        placeholder="Descrição"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <label>Preço do produto</label>
      <input
        className="mb-2 h-10 p-1"
        type="number"
        placeholder="Preço"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <label>Quantidade em estoque</label>
      <input
        className="mb-2 h-10 p-1"
        type="number"
        placeholder="Quantidade em Estoque"
        name="stockQty"
        value={formData.stockQty}
        onChange={handleChange}
      />
      <button className="mb-2 h-10 bg-slate-300 w-[50%]" type="submit">
        Cadastrar
      </button>
    </form>
  );
};

export default ProductForm;
