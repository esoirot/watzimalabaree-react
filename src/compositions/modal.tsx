import React, { createContext, useContext, useState } from 'react'

type ModalContextType = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null)

function useModalContext() {
  const context = useContext(ModalContext);
  
  if (!context) {
    throw new Error('Modal component must be used inside <Modal>');
  }

  return context;
}

// MODAL COMPONENT
type ModalProps = {
  children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
  const [open, setOpen] = useState(false);

  const value: ModalContextType = {
    open,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false)
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

// SUB COMPONENT
function ModalTrigger({ children }: { children: React.ReactNode }) {
  const { openModal } = useModalContext();

  return (
    <span
      onClick={openModal}
      style={{ cursor: "pointer" }}
    >
      { children }
    </span>
  );
}

function ModalContent({ children }: { children: React.ReactNode }) {
  const { open, closeModal } = useModalContext();

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={closeModal}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}

        <button onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  )
}

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;

export { Modal };

// OLD MODAL CODE
// const displayModal = () => {
//   return (
//     <div className="p-8">
//       {/* Open Modal Button */}
//       <button
//         onClick={() => setModalIsOpen(true)}
//         className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//       >
//         Add Item
//       </button>

//       {/* Modal Backdrop */}
//       {modalIsOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
//           {/* Modal Container */}
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             {/* Modal Header */}
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-lg font-semibold">
                  
//               </h2>
//               <button
//                 onClick={() => setModalIsOpen(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Modal Content */}
//             <div className="text-sm text-gray-600">
//               {AddItemForm()}
//             </div>

//             {/* Modal Footer */}
//             <div className="mt-6 flex justify-end gap-2">
//               <button
//                 onClick={() => setModalIsOpen(false)}
//                 className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-blue-700">
//                 Action
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const AddItemForm = () => {
//   return (
//     <div className="p-2 rounded-md">
//       <form className="bg-gray-800 p-2 flex flex-col gap-2 rounded-md">
//         <div className="bg-blue-500 flex flex-col p-2 rounded-md">
//           <label className="text-black p-2">
//             Item name
//           </label>
//           <input 
//             type='text'
//             id='name'
//             name='name'
//             required
//             className="bg-red-200 text-black flex p-2 rounded-md"
//             placeholder='The name of the item'
//             onChange={handleNewItemNameChange}
//           />
//         </div>

//         <div className="bg-purple-600 p-2 flex flex-col rounded-md">
//           <label className="text-black p-2">Item Price</label>
//           <input 
//             type='number'
//             id='price'
//             name='price'
//             className="bg-gray-200 text-black p-2 rounded-md"
//             placeholder='0.00'
//             onChange={handleNewItemPriceChange}
//           />
//         </div>

//         <div className="flex flex-row bg-red-500 p-2 rounded-md items-center">
//           <label
//             className="text-black p-2"
//             htmlFor='hasBarcode'
//           >
//             Item has barcode ?
//           </label>
//           <input 
//             type='checkbox'
//             id='hasBarcode'
//             name='hasBarcode'
//             required
//             className="size-4"
//             onChange={handleNewItemHasBarcodeChange}
//           />
//         </div>

//         {newItem.has_barcode && <div className="flex flex-row bg-teal-500 p-2 rounded-md">
//           <label className="text-black p-2">
//             Barcode Value<br />
//             (Read the numbers under the barcode)
//           </label>
//           <input 
//             type='text'
//             id='barcodeValue'
//             name='barcode'
//             required
//             className="p-2 bg-gray-200 text-black"
//             placeholder='4573102606990'
//             onChange={handleNewItemBarcodeValueChange}
//           />
//         </div>}

//         <button
//           className="p-2"
//           onClick={AddItemInLibrary}
//         >
//           Add Item in Library
//         </button>
//       </form>
//     </div>
//   );
// }
