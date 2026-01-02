import React from 'react'
import Modal from './Modal'
type discardWarningProps =  {
    onClose: () => void;
    onClick: () => void;


}

export default function DiscardWarning({onClose, onClick}: discardWarningProps) {
  return (
    <Modal
                  title="Discard changes?"
                  onClose={onClose}
                >
                  <p className="text-sm text-gray-600">
                    You have unsaved changes. If you close now, they will be lost.
                  </p>
    
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={onClose}
                      className="border px-3 py-1 rounded"
                    >
                      Continue editing
                    </button>
    
                    <button
                      onClick={onClick}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Discard
                    </button>
                  </div>
                </Modal>
  )
}
