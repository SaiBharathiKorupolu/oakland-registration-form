import React, { useState, useEffect } from "react";
import "./App.css";

const initialState = {
  child_name: "",
  dob: "",
  gender: "",
  nickname: "",
  aadhaar: "",
  address: "",
  program: "",
  mother_name: "",
  mother_job: "",
  mother_phone: "",
  mother_work: "",
  mother_aadhaar: "",
  mother_address: "",
  father_name: "",
  father_job: "",
  father_phone: "",
  father_work: "",
  father_aadhaar: "",
  father_address: "",
  pickup1_name: "",
  pickup1_relation: "",
  pickup2_name: "",
  pickup2_relation: "",
};

function App() {
  const [form, setForm] = useState(initialState);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ VALIDATION
  useEffect(() => {
    const valid =
      form.child_name.trim() !== "" &&
      /^\d{12}$/.test(form.aadhaar) &&
      /^\d{10}$/.test(form.mother_phone) &&
      /^\d{10}$/.test(form.father_phone);

    setIsValid(valid);
  }, [form]);

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "https://oakland-backend.onrender.com/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
        setForm(initialState);
      } else {
        alert("Failed to send");
      }
    } catch (err) {
      alert("Server error");
    }

    setLoading(false);
  };

  // ✅ SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-card">
          <h2>✅ Application Submitted!</h2>
          <p>We have received your registration successfully.</p>

          <button
            onClick={() => {
              setSubmitted(false);
              setForm(initialState);
            }}
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="logo">
        <img src="new logo.jpg" alt="logo" />
      </div>

      <div className="container">
        <div className="header">
          <h2>Online Admission Form</h2>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* CHILD */}
          <div className="card">
            <div className="section-title">Child Information</div>

            <div className="grid">
              <div className="field full">
                <label>
                  Full Name <span className="required">*</span>
                </label>
                <input
                  name="child_name"
                  value={form.child_name}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Date of Birth</label>
                <input type="date" name="dob" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Gender</label>
                <select name="gender" onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="field">
                <label>Name Child Responds To</label>
                <input name="nickname" onChange={handleChange} />
              </div>

              <div className="field">
                <label>
                  Aadhaar Number <span className="required">*</span>
                </label>
                <input
                  name="aadhaar"
                  value={form.aadhaar}
                  maxLength="12"
                  onChange={handleChange}
                />
                <small className="hint">Must be 12 digits</small>
              </div>

              <div className="field full">
                <label>Address</label>
                <input name="address" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* PROGRAM */}
          <div className="card">
            <div className="section-title">Program Enrolled</div>

            <div className="program">
              <label>
                <input
                  type="radio"
                  name="program"
                  value="Pre-Nur"
                  onChange={handleChange}
                />{" "}
                Pre-Nur
              </label>
              <label>
                <input
                  type="radio"
                  name="program"
                  value="Nursery"
                  onChange={handleChange}
                />{" "}
                Nursery
              </label>
              <label>
                <input
                  type="radio"
                  name="program"
                  value="LKG"
                  onChange={handleChange}
                />{" "}
                LKG
              </label>
              <label>
                <input
                  type="radio"
                  name="program"
                  value="UKG"
                  onChange={handleChange}
                />{" "}
                UKG
              </label>
            </div>
          </div>

          {/* MOTHER */}
          <div className="card">
            <div className="section-title">Mother’s Information</div>

            <div className="grid">
              <div className="field">
                <label>Name</label>
                <input name="mother_name" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Place of Employment</label>
                <input name="mother_job" onChange={handleChange} />
              </div>

              <div className="field">
                <label>
                  Cell Number <span className="required">*</span>
                </label>
                <input
                  name="mother_phone"
                  value={form.mother_phone}
                  maxLength="10"
                  onChange={handleChange}
                />
                <small className="hint">Enter 10 digit mobile number</small>
              </div>

              <div className="field">
                <label>Work Number</label>
                <input name="mother_work" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Aadhar Number</label>
                <input name="mother_aadhaar" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Address</label>
                <input name="mother_address" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* FATHER */}
          <div className="card">
            <div className="section-title">Father’s Information</div>

            <div className="grid">
              <div className="field">
                <label>Name</label>
                <input name="father_name" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Place of Employment</label>
                <input name="father_job" onChange={handleChange} />
              </div>

              <div className="field">
                <label>
                  Cell Number <span className="required">*</span>
                </label>
                <input
                  name="father_phone"
                  value={form.father_phone}
                  maxLength="10"
                  onChange={handleChange}
                />
                <small className="hint">Enter 10 digit mobile number</small>
              </div>

              <div className="field">
                <label>Work Number</label>
                <input name="father_work" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Aadhar Number</label>
                <input name="father_aadhaar" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Address</label>
                <input name="father_address" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* PICKUP */}
          <div className="card">
            <div className="section-title">Authorized Pickup Persons</div>

            <div className="grid">
              <div className="field">
                <label>Person 1 Name</label>
                <input name="pickup1_name" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Relationship</label>
                <input name="pickup1_relation" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Person 2 Name</label>
                <input name="pickup2_name" onChange={handleChange} />
              </div>

              <div className="field">
                <label>Relationship</label>
                <input name="pickup2_relation" onChange={handleChange} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || loading}
            className={!isValid || loading ? "btn disabled" : "btn"}
          >
            Submit Application
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
