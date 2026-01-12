import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/emp-dashboard")}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-md 
                 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm 
                 transition shadow-sm"
    >
      ← Back to Dashboard
    </button>
  );
}

export default BackButton;
