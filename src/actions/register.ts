"use server";
import { prisma } from "@/lib";
import {
  RegisterFormSchema,
  RegisterSchema,
} from "@/schema/registerFormSchema";
import bcrypt from "bcryptjs";
type RegisterFormState =
  | {
      status: "error";
      errors?: {
        fullName?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      formError?: string;
    }
  | {
      status: "success";
      success: boolean;
    };

export const createAccount = async (
  data: RegisterSchema
): Promise<RegisterFormState> => {
  const result = RegisterFormSchema.safeParse(data);

  if (!result.success) {
    return { status: "error", errors: result.error.flatten().fieldErrors };
  }

  const { fullName: name, email, password, confirmPassword } = result.data;
  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existedUser) {
    return {
      status: "error",
      errors: { email: ["account with this email id already exists "] },
    };
  }

  if (password !== confirmPassword) {
    return {
      status: "error",
      errors: {
        confirmPassword: ["Passwords do not match"],
      },
    };
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        xp: 0,
        level: 0,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { status: "error", formError: error.message };
    } else {
      return { status: "error", formError: "Something went wrong" };
    }
  }

  return { status: "success", success: true };
};
