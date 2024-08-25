import { mixed, object, ref, string } from "yup";

export const loginSchema = object({
  email: string()
    .required("This field is required")
    .email("Valid email is required"),
  password: string().required("This field is required"),
});

export const createAccountSchema = object({
  firstName: string().required("This field is required").min(3),
  lastName: string(),
  email: string()
    .required("This field is required")
    .email("Valid email is required"),
  password: string().required("This field is required").min(3),
  confirmPassword: string()
    .required("You must confirm your password")
    .oneOf([ref("password"), null], "Passwords must match"),
});

export const changeUserDataSchema = object({
  firstName: string().required("This field is required").min(3),
  lastName: string(),
  email: string()
    .required("This field is required")
    .email("Valid email is required"),
  password: string(),
});

export const createTaskSchema = object({
  title: string()
    .required("This field is required")
    .min(3, "Minimum text length is 3 characters"),
  description: string().nullable(),
  priority: mixed()
    .required("This field is required")
    .oneOf(["high", "medium", "low"], "Invalid priority selected"),
  dueDate: string().required("This field is required"),
});
