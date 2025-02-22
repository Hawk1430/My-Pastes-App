import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
import { toast } from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
    if (!pasteId) {
      setTitle("");
      setValue("");
      return;
    }

    const paste = allPastes.find((p) => p._id === pasteId);
    if (paste) {
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    if (!value.trim()) {
      toast.error("⚠️ Please enter content before saving.");
      return;
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
    titleRef.current?.focus();
  }

  return (
    <div className="p-6 w-full min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📝 My Paste App</h1>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <input
          ref={titleRef}
          className="p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl w-full md:w-[60%] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className={`p-3 rounded-xl w-full md:w-auto font-semibold transition-all shadow-md ${
            !title.trim() && !value.trim()
              ? "bg-gray-300 cursor-not-allowed text-gray-600"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          onClick={createPaste}
          disabled={!title.trim() && !value.trim()}
        >
          {pasteId ? "🔄 Update Paste" : "➕ Create Paste"}
        </button>
      </div>

      <textarea
        className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl w-full min-h-[70vh] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-sm bg-white dark:bg-gray-800 text-black dark:text-white"
        value={value}
        placeholder="Write your content here..."
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Home;
