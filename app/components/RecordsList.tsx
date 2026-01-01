'use client';

// RecordsList.tsx
type FormRecord = {
  name: string;
  email: string;
  agreed: boolean;
  role: string;
};

type RecordsListProps = {
  records: FormRecord[];
  onEdit: (record: FormRecord, index: number) => void;
  onDelete: (index: number) => void;
  onClearAll: () => void;
};


function RecordsList({ records, onEdit, onDelete, onClearAll }:RecordsListProps) {
    if (records.length === 0) return null;
  return (
    <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Submitted Records</h2>
            <button
              type="button"
              onClick={onClearAll}
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
                  onClick={() => onEdit(record, index)}
                  className="text-blue-600 text-sm mr-3"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(index)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
    </div>
  )
}

export default RecordsList