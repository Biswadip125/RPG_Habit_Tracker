"use server";
import { signIn } from "@/auth";
import { prisma } from "@/lib";
import { LoginFormSchema, LoginSchema } from "@/schema/loginFormSchema";
import { AuthError } from "next-auth";

type LoginFormState =
  | {
      status: "error";
      errors?: {
        email?: string[];
        password?: string[];
      };
      formError?: string;
    }
  | {
      status: "success";
      message: string;
      validatedData: LoginSchema;
    };

export const login = async (data: LoginSchema): Promise<LoginFormState> => {
  const result = LoginFormSchema.safeParse(data);

  if (!result.success) {
    return { status: "error", errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!userExists || !userExists.password) {
    return { status: "error", formError: "User not found" };
  }

  try {
    await signIn("credentials", {
      email: userExists.email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", formError: "Invalid credentials" };
        default:
          return {
            status: "error",
            formError: "please confirm your email address",
          };
      }
    }
  }
  return {
    status: "success",
    message: "Logged in Successfully",
    validatedData: result.data,
  };
};
