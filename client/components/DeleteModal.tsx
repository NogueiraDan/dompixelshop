import React from 'react';

const DeleteModal = ({ product, onClose }:any) => {

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${product.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        alert("Produto Removido com Sucesso!")
        onClose();
        window.location.reload();
      } else {
        console.error('Falha ao deletar o produto');
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
          <h2 className="text-lg font-semibold mb-4">Remover Produto</h2>
          <p className="mb-4">Tem certeza de que deseja remover o produto "{product.name}"?</p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-2"
            >
              Remover
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
