import React, { useState } from 'react';

function EditModal({ product, onClose, onSave }: any) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = async () => {
    const updatedData = {
      name: editedProduct.name,
      price: parseFloat(editedProduct.price),
      description: editedProduct.description,
      stockQty: parseInt(editedProduct.stockQty),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/products/${product.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (response.ok) {
        onClose();
        window.location.reload();
      } else {
        console.error('Falha ao atualizar o produto');
      }
    } catch (error) {
      console.error('Erro ao processar a requisição', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50">
        <div className="modal-content p-4">
          <h2 className="text-lg font-semibold mb-4">Editar Produto</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">
                Nome:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-600">
                Preço:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-600">
                Preço:
              </label>
              <textarea
                name="description"
                value={editedProduct.description}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-600">
                Preço:
              </label>
              <input
                type="number"
                id="stockQty"
                name="stockQty"
                value={editedProduct.stockQty}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
