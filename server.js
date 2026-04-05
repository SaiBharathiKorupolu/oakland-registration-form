require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.post("/send-email", async (req, res) => {
  console.log("🔥 API HIT");

  const d = req.body;

  const html = `
    <h2>New Registration</h2>

    <h3>Child Info</h3>
    Name: ${d.child_name}<br>
    DOB: ${d.dob}<br>
    Gender: ${d.gender}<br>
    Nickname: ${d.nickname}<br>
    Aadhaar: ${d.aadhaar}<br>
    Address: ${d.address}<br>

    <h3>Program</h3>
    ${d.program}<br>

    <h3>Mother</h3>
    ${d.mother_name} (${d.mother_phone})<br>
    Job: ${d.mother_job}<br>
    Work: ${d.mother_work}<br>

    <h3>Father</h3>
    ${d.father_name} (${d.father_phone})<br>
    Job: ${d.father_job}<br>
    Work: ${d.father_work}<br>

    <h3>Pickup</h3>
    ${d.pickup1_name} (${d.pickup1_relation})<br>
    ${d.pickup2_name} (${d.pickup2_relation})
  `;

  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "oaklandvizag@gmail.com", // your email
      subject: "New School Registration",
      html: html,
    });

    console.log("✅ EMAIL SENT:", response);

    res.send({ success: true });
  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).send({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
