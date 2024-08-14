import { Hono } from "hono";
import { Button, LabeledInput } from "@/components";
import { setMessage, useMessage } from "@/server/layout/Message.tsx";

const Login = () => {
  const message = useMessage();

  return (
    <form method="post" className="flex flex-col items-start gap-4">
      {message}
      <fieldset className="flex flex-col gap-2">
        <LabeledInput label="Email" name="email" />
        <LabeledInput label="Password" name="password" type="password" />
      </fieldset>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default new Hono()
  .post("/", async (c, next) => {
    const body = await c.req.formData();
    const email = body.get("email")?.toString();
    const password = body.get("password")?.toString();
    if (!email || !password) {
      setMessage(c, "Missing credentials!", "warning");
      return next();
    }

    const db = c.get("db");
    const { data } = await db.auth.signInWithPassword({ email, password });

    if (!data.user) {
      setMessage(c, "Invalid credentials!", "danger");
      return next();
    }

    return c.json(data);
  })
  .all("/", (c) => c.render(<Login />, { title: "Login" }));
