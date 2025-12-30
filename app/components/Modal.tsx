type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <div className="flex justify-between mb-4">
          <h3 className="font-bold">{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        {children}
      </div>
    </div>
  );
}
