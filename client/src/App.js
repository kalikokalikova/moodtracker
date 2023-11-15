import React, { useState, useEffect } from "react";
import api from "./api";

const App = () => {
  const [moodpoints, setMoodpoints] = useState([]);
  const [formData, setFormData] = useState({
    label: "",
    energy: null,
    pleasantness: null,
  });

  const fetchMoodpoints = async () => {
    const response = await api.get("/moodpoints/");
    setMoodpoints(response.data);
  };

  useEffect(() => {
    fetchMoodpoints();
  }, []);

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.targe.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await api.post("/moodpoints/", formData);
    fetchMoodpoints();
    setFormData({
      label: "",
      energy: null,
      pleasantness: null,
    });
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className="container-fluid">
          <a className='navbar-brand' href='#'>
            Moodtracker
          </a>
        </div>
      </nav>

      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="label" className="form-label">
              Title
            </label>
            <input type='text' className="form-control" id='label' name='label' onChange={handleInputChange} value={formData.label}/>
          </div>
          <div className="mb-3">
            <label htmlFor="energy" className="form-label">
              Energy
            </label>
            <input type='number' className="form-control" id='energy' name='energy' onChange={handleInputChange} value={formData.energy}/>
          </div>
          <div className="mb-3">
            <label htmlFor="pleasantness" className="form-label">
              Pleasantness
            </label>
            <input type='number' className="form-control" id='pleasantness' name='pleasantness' onChange={handleInputChange} value={formData.pleasantness}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>
    </div>
  )
};

export default App;
