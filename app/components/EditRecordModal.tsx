'use client';

import Modal from "./Modal";


type FormRecord = {
  name: string;
  email: string;
  agreed: boolean;
  role: string;
};

type EditRecordModalProps = {
  isOpen: boolean;
  editForm: FormRecord; // <- this is your editForm state
  hasChanges: boolean;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
};

function EditRecordModal({ isOpen,
  editForm, 
  hasChanges,
  onClose,
  onChange,
  onSave,}:EditRecordModalProps) {
    if(!isOpen) return null;
  return (
    <Modal
                  title="Edit record"
                  onClose={
                    onClose
                    //   () => {
                    //   setEditIndex(null);
                    //   setOriginalRecord(null);
                    // }
                  }
                >
                  <div className="flex flex-col gap-3">
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={onChange}
                      className="border p-2 rounded"
                      placeholder="Name"
                    />
    
                    <input
                      name="email"
                      value={editForm.email}
                      onChange={onChange}
                      className="border p-2 rounded"
                      placeholder="Email"
                    />
    
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="agreed"
                        checked={editForm.agreed}
                        onChange={onChange}
                      />
                      Agreed
                    </label>
    
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={editForm.role === "user"}
                        onChange={onChange}
                      />
                      User
                    </label>
    
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={editForm.role === "admin"}
                        onChange={onChange}
                      />
                      Admin
                    </label>
    
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={onClose}
                        className="border px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
    
                      <button
                        onClick={onSave}
                        disabled={!hasChanges}
                        className="bg-blue-500 text-white px-3 py-1 rounded  disabled:bg-gray-300
                                disabled:text-gray-500
                                  disabled:cursor-not-allowed
                                   disabled:opacity-60"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Modal>
  )
}

export default EditRecordModal;