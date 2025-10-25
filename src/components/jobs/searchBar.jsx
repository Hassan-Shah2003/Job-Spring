import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState(""); // 🔹 new text input

  const handleSubmit = () => {
    onSearch({ location, title, keyword });
  };

  return (
    <div className="w-full h-70 bg-[#244034] text-white flex flex-col justify-center items-center text-center gap-7 ">
      <div>
        <h1 className="text-4xl font-semibold mb-3">Job Finding</h1>
        <p>We delivered blazing fast & striking work solution</p>
      </div>

      <div className="text-xl font-normal text-black bg-white rounded-2xl flex items-center">
        <select
          className="w-60 p-5 pr-2 outline-0 "
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Location</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Faisalabad">Faisalabad</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>

        <select
          className="w-70 p-5 pr-2 outline-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        >
          <option value="">Job Title</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="UI/UX Designer">UI/UX Designer</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Graphic Designer">Graphic Designer</option>
        </select>
        <div><hr /></div>
        <input
          type="text"
          placeholder="Search by keyword"
          className="w-60 p-5 outline-0 "
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button
          className="w-30 p-5 rounded-e-2xl bg-[#d2f34c] cursor-pointer"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
