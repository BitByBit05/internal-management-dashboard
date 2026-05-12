import { register, checkExisting, getPassword } from "./userModel.js";
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

async function loginUser(req, res) {
  const { email, password } = req.body;
  if (await checkExisting(email)) {
    const passwordStored = await getPassword(email);
    if (await bcrypt.compare(password, passwordStored)) {
      res.status(201).json({ message: "logged in" });
      return;
    }
    res.status(409).json({ message: "wrong password" });
    return;
  }
  res.status(409).json({ message: "no user found!" });
  return;
}

export default { registerUser, loginUser };
