import { NewLinkForm } from "@/components/NewLinkForm";

export default function NewLink() {
  return (
    <div className="container">
      <h1 className="text-3xl font-semibold mb-5">
        Create a New Shortened Link
      </h1>
      <NewLinkForm />
    </div>
  );
}
