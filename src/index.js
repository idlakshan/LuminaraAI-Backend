import express from "express";

const app= express();
app.use(express.json());

app.get("/", (req, res) => {
    console.log("GET request received");
    return res.status(200).json("value");
 });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
