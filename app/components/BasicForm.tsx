"use client";
import { useEffect, useState } from "react";
// import ConfirmDeleteModal from "./ConfirmDeleteModal";
import Modal from "./Modal";
import deepEqual from "../utils";
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

    console.log("Form data:", form);
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


  
  return (
    <div>
      <form
        className="mt-6 flex flex-col gap-4 max-w-sm"
        onSubmit={handleSubmit}
      >
        <input
          name="name"
          value={form.name}
          placeholder="name"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {submitted && errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}
        <input
          name="email"
          value={form.email}
          placeholder="email"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        {submitted && errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="agreed"
            checked={form.agreed}
            onChange={handleChange}
          />
          {submitted && errors.agreed && (
            <p className="text-red-500 text-sm">{errors.agreed}</p>
          )}
          I agree to the terms
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="role"
            value="user"
            checked={form.role === "user"}
            onChange={handleChange}
          />
          User
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="role"
            value="admin"
            checked={form.role === "admin"}
            onChange={handleChange}
          />
          Admin
        </label>
        {submitted && errors.role && (
          <p className="text-red-500 text-sm">{errors.role}</p>
        )}

        <button
          type="submit"
          disabled={!form.name || !form.email || !form.agreed || !form.role}
          className="bg-black text-white p-2 rounded disabled:opacity-50"
        >
          sumbit
        </button>
      </form>
      {/* Records section */}
      {records.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Submitted Records</h2>
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete All
            </button>
          </div>

          <ul className="space-y-3">
            {records.map((record, index) => (
              <li key={index} className="border p-3 rounded bg-gray-50">
                <p>
                  <strong>Name:</strong> {record.name}
                </p>
                <p>
                  <strong>Email:</strong> {record.email}
                </p>
                <p>
                  <strong>Role:</strong> {record.role}
                </p>
                <p>
                  <strong>Agreed:</strong> {record.agreed ? "Yes" : "No"}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEditIndex(index);
                    setEditForm(record);
                    setOriginalRecord(record);
                  }}
                  className="text-blue-600 text-sm mr-3"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteIndex(index)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          {deleteIndex !== null && (
            <Modal title="Confirm delete" onClose={() => setDeleteIndex(null)}>
              <p>This action cannot be undone.</p>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setDeleteIndex(null)}>Cancel</button>
                <button
                  onClick={() => {
                    setRecords((prev) =>
                      prev.filter((_, i) => i !== deleteIndex)
                    );
                    setDeleteIndex(null);
                  }}
                  className="bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            </Modal>
          )}
          {editIndex !== null && (
  <Modal
    title="Edit record"
    onClose={() => setEditIndex(null)}
  >
    <div className="flex flex-col gap-3">
      <input
        name="name"
        value={editForm.name}
        onChange={handleEdit}
        className="border p-2 rounded"
        placeholder="Name"
      />

      <input
        name="email"
        value={editForm.email}
        onChange={handleEdit}
        className="border p-2 rounded"
        placeholder="Email"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="agreed"
          checked={editForm.agreed}
          onChange={handleEdit}
        />
        Agreed
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="role"
          value="user"
          checked={editForm.role === "user"}
          onChange={handleEdit}
        />
        User
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="role"
          value="admin"
          checked={editForm.role === "admin"}
          onChange={handleEdit}
        />
        Admin
      </label>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => setEditIndex(null)}
          className="border px-3 py-1 rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setRecords((prev) =>
              prev.map((rec, i) =>
                i === editIndex ? editForm : rec
              )
            );
            setEditIndex(null);
            setOriginalRecord(null);
          }}
          disabled={!hasChanges}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </Modal>
)}

        </div>
      )}
    </div>
  );
}

export default BasicForm;
