import BasicForm from "./components/BasicForm";


export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Forms Practice</h1>
      
      <p className="text-gray-600 mt-2">Step by step, no rush.</p>
      <BasicForm />
    </main>
  );
}
