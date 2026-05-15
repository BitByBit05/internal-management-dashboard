import jwt from "jsonwebtoken";

export async function isAuthorized(req, res, next) {
  const jwtToken = req.body.jwtToken;

  try {
    const { sub, email } = jwt.verify(jwtToken, process.env.jwtSecret);
    console.log(sub + "\n" + email);
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      res.json("Authentication Failed...");
    } else if (err.name === "TokenExpiredError") {
      const expiredPayload = jwt.decode(jwtToken);

      const newToken = jwt.sign({ sub: expiredPayload.sub, email: expiredPayload.email }, process.env.jwtSecret, {
        expiresIn: 100,
      });

      return res.json({
        message: "Your old token expired, but I made you a new one!",
        newToken: newToken,
        instruction: "Use this new token for your next request.",
      });
    } else {
      res.json("An issue occured...");
    }
  }
}

export async function registerUser(req, res) {
  const { name, email } = req.body;

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
