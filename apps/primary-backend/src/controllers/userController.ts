import { Request, Response } from "express";
import { SignupSchema, SigninSchema } from "@repo/zodtypes/types";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RequestWithUser from "../interface/RequestWithUser";

const createUser = async (req: Request, res: Response) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: parsedData.error.errors.map((err) => err.message).join(", "),
    });
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(parsedData.data.password, salt);

  await prisma.user.create({
    data: {
      name: parsedData.data.name,
      email: parsedData.data.username,
      password: hashedPassword,
    },
  });

  return res.json({
    message: "Please verify your account by checking your email",
  });
};

const signin = async (req: Request, res: Response) => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: parsedData.error.errors.map((err) => err.message).join(", "),
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    parsedData.data.password,
    user.password,
  );

  if (!isPasswordValid) {
    return res.status(403).json({
      message: "Invalid credentials",
    });
  }

  // sign the jwt
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({
      message: "Internal server error: JWT secret is not defined",
    });
  }
  const token = jwt.sign(
    {
      id: user.id,
    },
    jwtSecret,
    { expiresIn: "7d" },
  );

  return res.json({
    token,
  });
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req as RequestWithUser;
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.json({
    user,
  });
};

export { createUser, signin, getUser };
