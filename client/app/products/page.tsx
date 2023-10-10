'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EditModal from '../../components/EditModal';
import DeleteModal from '../../components/DeleteModal';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQty: number;
}


export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProducts();
  }, []);



  const openEditModal = (product: any) => {
    setSelectedProduct(product);
    setModalEditOpen(true);
  };
  const openDeleteModal = (product: any) => {
    setSelectedProduct(product);
    setModalDeleteOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalEditOpen(false);
    setModalDeleteOpen(false);
  };

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-10 sm:p-0">
      <h2 className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          &larr;
        </span>
        <Link className="mx-4" href="/">
          Voltar para Home
        </Link>
      </h2>

      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm sm:flex text-center">
        <p className="text-3xl font-bold">Catálogo de Produtos</p>
      </div>
      {
        products.length <= 0 && (
          <>
            <h3 className='text-3xl font-bold'>Carregando...</h3>
          </>
        )
      }
      {products.length > 0 && (
        <>
          {products?.map((data, index) => (
            <>
              <div className="group flex flex-row justify-between h-auto rounded-lg border border-transparent px-5 py-4 my-2 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 sm:w-[60%] ">
                <div className="flex flex-col gap-5 w-[90%]" key={data.id}>
                  <span>
                    Produto: <strong>{data?.name}</strong>
                  </span>
                  <span>
                    <strong>Descrição: </strong>
                    {data?.description}
                  </span>
                  <span>
                    Preço: <strong>{data?.price}</strong>
                  </span>
                  <span>
                    Quantidade em Estoque: <strong>{data?.stockQty}</strong>{' '}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span
                    className="mb-2 cursor-pointer"
                    onClick={() => openEditModal(data)}
                  >
                    ​✏️​
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => openDeleteModal(data)}
                  >
                    🗑️​
                  </span>
                </div>
              </div>
            </>
          ))}
        </>
      )}

      {modalEditOpen && (
        <EditModal
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
      {modalDeleteOpen && (
        <DeleteModal
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
    </main>
  );
}
