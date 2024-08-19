import { Hono } from "hono";
import { Button, LabeledInput } from "@/components";
import { setMessage, useMessage } from "@/server/layout/Message.tsx";

const Login = () => {
  const message = useMessage();

  return (
    <form method="post" className="flex flex-col items-start gap-4">
      {message}
      <fieldset className="flex flex-col gap-2">
        <LabeledInput label="Email" name="email" autoComplete="username" />
        <LabeledInput
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
      </fieldset>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default new Hono()
  .all("/", (c) => c.redirect("/auth/login"))
  .post("/login", async (c, next) => {
    const body = await c.req.formData();
    const email = body.get("email")?.toString();
    const password = body.get("password")?.toString();
    if (!email || !password) {
      setMessage(c, "Missing credentials!", "warning");
      return next();
    }

    const { error } = await c.get("db").auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(c, error.message, "danger");
      return next();
    }

    return c.redirect("/secret");
  })
  .get("/login", async (c, next) => {
    const { data } = await c.get("db").auth.getUser();
    if (data.user) {
      // already logged in
      return c.redirect("/secret");
    }
    return next();
  })
  .all("/login", (c) => c.render(<Login />, { title: "Login" }))
  .all("/logout", async (c) => {
    await c.get("db").auth.signOut();
    return c.redirect("/");
  });
