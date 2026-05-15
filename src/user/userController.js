import { register, checkExisting, getPassword } from "./userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  if (await checkExisting(email)) {
    return res.status(409).json({ error: "User Already Exists !" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const params = [name, email, hashedPassword];
  await register(params);

  const accessToken = jwt.sign(
    {
      sub: name,
      email: email,
    },
    process.env.jwtSecret,
    {
      expiresIn: 100,
      algorithm: "HS256",
    },
  );

  console.log(name + "\n" + email + "\n" + accessToken);
  res.json({
    token: accessToken,
  });
}

async function loginUser(req, res) {
  const { jwtToken } = req.body;
  const { sub, email } = jwt.verify(jwtToken, process.env.jwtSecret);
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
