import { prisma } from "../prisma/client.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({
      message: "email, username, password required",
    });
  }

  const exists = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (exists) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email, username, password: hashed },
  });

  const token = signToken({ userId: user.id });

  res.status(201).json({ token });
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({
      message: "identifier and password required",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { username: identifier },
      ],
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ userId: user.id });

  res.json({ token });
};
