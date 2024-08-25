import { Box, LabeledInput, Link, LoadingForm } from "@/components";

export const AuthForm = ({ signup = false }) => {
  return (
    <Box className="justify-center">
      <LoadingForm
        className="max-w-lg"
        afterContent={!signup && (
          <span>
            or <Link href="/auth/signup">Sign up</Link>
          </span>
        )}
      >
        <LabeledInput
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
        <LabeledInput
          label={signup ? "New Password" : "Password"}
          name="password"
          type="password"
          autoComplete={signup ? "new-password" : "current-password"}
          required
        />
        {signup && (
          <LabeledInput
            label="Confirm Password"
            name="password2"
            type="password"
            autoComplete="new-password"
            required
          />
        )}
      </LoadingForm>
    </Box>
  );
};
