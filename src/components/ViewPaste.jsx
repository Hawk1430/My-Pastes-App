import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="text-center mt-20 text-red-500 dark:text-red-400 text-xl font-semibold">
        ⚠️ Paste not found!
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">📄 View Paste</h1>

      <div className="flex flex-row gap-7 mt-2 place-content-between">
        <input
          className="p-2 border-2 rounded-2xl w-full md:w-[60%] pl-3 bg-white dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
        />
        <button
          className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => {
            navigator.clipboard
              .writeText(paste?.content || "")
              .then(() => toast.success("Copied to Clipboard"))
              .catch(() => toast.error("Failed to Copy"));
          }}
        >
          <Copy size={20} />
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="p-4 border-2 rounded-2xl mt-4 w-full min-h-[70vh] bg-white dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          value={paste.content}
          placeholder="Enter content here"
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
