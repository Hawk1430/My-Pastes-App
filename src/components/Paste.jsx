import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste, resetAllPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router";
import {
  Edit,
  Eye,
  Trash2,
  Copy,
  Share2,
  FileText,
  ClipboardList,
} from "lucide-react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  function handleReset() {
    toast.custom((t) => (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-3">
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Are you sure?
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This will delete all saved pastes.
        </p>
        <div className="flex gap-4 mt-2">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={() => {
              dispatch(resetAllPaste());
              toast.dismiss(t.id);
              toast.success("All pastes deleted!");
            }}
          >
            Yes, Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  }

  const handleShare = (pasteId, pasteTitle) => {
    const pasteURL = `${window.location.origin}/pastes/${pasteId}`;

    if (navigator.share) {
      navigator
        .share({
          title: pasteTitle || "Untitled Paste",
          text: "Check out this paste!",
          url: pasteURL,
        })
        .then(() => toast.success("Paste shared successfully!"))
        .catch(() => toast.error("Sharing failed!"));
    } else {
      navigator.clipboard
        .writeText(pasteURL)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy link!"));
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
        <ClipboardList size={28} className="text-blue-500" /> All Pastes
      </h1>
      <div className="flex flex-row place-content-between">
        <input
          className="p-2 border-2 rounded-2xl min-w-[550px] mt-5 bg-white dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600"
          type="search"
          value={searchTerm}
          placeholder="Search here"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 mt-4"
          onClick={handleReset}
        >
          Reset All Pastes
        </button>
      </div>

      <div className="flex flex-col gap-5 mt-4">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="border-2 p-4 rounded-lg shadow-md my-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            >
              <div className="flex flex-row place-content-between">
                <div className="flex items-center gap-2">
                  <FileText size={24} className="text-blue-500" />
                  <div>
                    <div className="text-lg font-bold dark:text-gray-200">
                      {paste.title || "Untitled"}
                    </div>
                    <div className="my-2 truncate dark:text-gray-300">
                      {paste.content || "No content"}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-4 place-content-evenly mt-4">
                    <NavLink
                      to={`/?pasteId=${paste?._id}`}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <Edit size={20} />
                    </NavLink>
                    <NavLink
                      to={`/pastes/${paste?._id}`}
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <Eye size={20} />
                    </NavLink>
                    <button
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(paste?._id)}
                    >
                      <Trash2 size={20} />
                    </button>
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
                    <button
                      className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                      onClick={() => handleShare(paste._id, paste.title)}
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                    {new Date(paste.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : pastes.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-5">
            No pastes available.
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-5">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
