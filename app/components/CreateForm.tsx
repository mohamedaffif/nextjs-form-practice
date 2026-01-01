'use client';
type CreateFormProps = {
  form: {
    name: string;
    email: string;
    agreed: boolean;
    role: string;
  };
  errors: {
    name?: string;
    email?: string;
    agreed?: string;
    role?: string;
  };
  submitted: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};



function CreateForm({ form,
  errors,
  submitted,
  onChange,
  onSubmit }:CreateFormProps) {
  return (
    <form
            className="mt-6 flex flex-col gap-4 max-w-sm"
            onSubmit={onSubmit}
          >
            <input
              name="name"
              value={form.name}
              placeholder="name"
              onChange={onChange}
              className="border p-2 rounded"
            />
            {submitted && errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
            <input
              name="email"
              value={form.email}
              placeholder="email"
              onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
              />
              User
            </label>
    
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={onChange}
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
  )
}

export default CreateForm