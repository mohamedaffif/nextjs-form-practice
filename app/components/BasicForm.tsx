"use client";
import { useEffect, useState } from "react";
// import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Modal from "./Modal";
import deepEqual from "../utils";
import CreateForm from "./CreateForm";
import RecordsList from "./RecordsList";
import DeleteConfirmModal from "./DeleteConfirmModal";
import EditRecordModal from "./EditRecordModal";
import DiscardWarning from "./DiscardWarning";
type FormRecord = {
  name: string;
  email: string;
  agreed: boolean;
  role: string;
};

function BasicForm() {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<FormRecord>({
    name: "",
    email: "",
    agreed: false,
    role: "",
  });
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [showDiscardWarning, setShowDiscardWarning] = useState(false);

  const [records, setRecords] = useState<FormRecord[]>([]);
  const [form, setForm] = useState({
    email: "",
    name: "",
    agreed: false,
    role: "",
  });
  const [originalRecord, setOriginalRecord] = useState<FormRecord | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    agreed?: string;
    role?: string;
  }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  function handleEdit(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const newErrors: typeof errors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.agreed) newErrors.agreed = "You must agree";
    if (!form.role) newErrors.role = "Select a role";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setRecords((prev) => [...prev, form]);
    setSubmitted(false);
    setErrors({});

    setForm({
      name: "",
      email: "",
      agreed: false,
      role: "",
    });
  }
  useEffect(() => {
    const stored = localStorage.getItem("records");
    if (stored && records.length === 0) {
      setRecords(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("records", JSON.stringify(records));
  }, [records]); // ✅ saves whenever records updates

  function handleClear() {
    setRecords([]);
    localStorage.removeItem("records");
  }
  function handleDelete(index: number) {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  }

  const hasChanges =
    originalRecord !== null && !deepEqual(editForm, originalRecord);

  function requestCloseEdit() {
    if (hasChanges) {
      setShowDiscardWarning(true);
    } else {
      closeEdit();
    }
  }

  function closeEdit() {
    setEditIndex(null);
    setOriginalRecord(null);
    setShowDiscardWarning(false);
  }

  return (
    <div>
      <CreateForm
        form={form}
        errors={errors}
        submitted={submitted}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/* Records section */}
      {records.length > 0 && (
        <div className="mt-10">
          <RecordsList
            records={records}
            onEdit={(record, index) => {
              setEditIndex(index);
              setEditForm({ ...record });
              setOriginalRecord({ ...record });
            }}
            onDelete={(index) => {
              setDeleteIndex(index);
              setEditIndex(null);
              setOriginalRecord(null);
            }}
            onClearAll={handleClear}
          />

          <DeleteConfirmModal
            isOpen={deleteIndex !== null}
            onClose={() => setDeleteIndex(null)}
            onConfirm={() => {
              if (deleteIndex !== null) handleDelete(deleteIndex);
              setDeleteIndex(null);
            }}
          />

          <EditRecordModal
            editForm={editForm}
            isOpen={editIndex !== null}
            hasChanges={hasChanges}
            onClose={requestCloseEdit}
            onChange={handleEdit}
            onSave={() => {
              setRecords((prev) =>
                prev.map((rec, i) => (i === editIndex ? editForm : rec))
              );
              setEditIndex(null);
              setOriginalRecord(null);
            }}
          />

          {showDiscardWarning && (
            <DiscardWarning
              onClose={() => setShowDiscardWarning(false)}
              onClick={closeEdit}
            />
          )}

          {/* {showDiscardWarning && (
            <Modal
              title="Discard changes?"
              onClose={() => setShowDiscardWarning(false)}
            >
              <p className="text-sm text-gray-600">
                You have unsaved changes. If you close now, they will be lost.
              </p>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowDiscardWarning(false)}
                  className="border px-3 py-1 rounded"
                >
                  Continue editing
                </button>

                <button
                  onClick={closeEdit}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Discard
                </button>
              </div>
            </Modal>
          )} */}
        </div>
      )}
    </div>
  );
}

export default BasicForm;
