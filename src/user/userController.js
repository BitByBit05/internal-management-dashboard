import { register, checkExisting } from "./userModel.js";
import bcrypt from "bcrypt";

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (await checkExisting(email)) {
    return res.status(409).json({ error: "User Already Exists !" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const params = [name, email, hashedPassword];
  await register(params);

  res.status(201).json({ message: "User registered" });
}

export default { registerUser };
