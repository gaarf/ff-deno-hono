import { Button } from "@/components/Button.tsx";
import { Box, Link } from "@/components/intrinsic.ts";
import { LabeledInput } from "@/components/LabeledInput.tsx";
import { useCallback, useState } from "@/react.shim.ts";

export const AuthForm = ({ signup = false }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(() => setLoading(true), []);

  return (
    <div className="flex flex-col items-center">
      <form
        method="post"
        className="flex w-full max-w-md p-4 rounded bg-neutral-1 flex-col items-start gap-4"
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col gap-2 w-full">
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
        </fieldset>
        <Box className="justify-between self-stretch">
          <Button type="submit" loading={loading}>
            Submit
          </Button>
          {!signup && (
            <span>
              or <Link href="/auth/signup">Sign up</Link>
            </span>
          )}
        </Box>
      </form>
    </div>
  );
};
