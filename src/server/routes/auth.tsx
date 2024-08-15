import { Hono } from "hono";
import { Button, LabeledInput, Code } from "@/components";
import { setMessage, useMessage } from "@/server/layout/Message.tsx";
import { requireAuth } from "@/supabase/server.ts";
import { useRequestContext } from "@/server/context.ts";

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

const Logout = () => {
  const c = useRequestContext();
  return (
    <section>
      <p className="mb-4">Hello user <Code>{c.get("userId")}</Code></p>
      <Button href="/auth/logout">Logout</Button>
    </section>
  );
}

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

    const db = c.get("db");
    const { error } = await db.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(c, error.message, "danger");
      return next();
    }

    return c.redirect("/auth/protected");
  })
  .get("/login", async (c, next) => {
    const { data } = await c.get("db").auth.getUser();
    console.log(data);
    if (data.user) {
      // already logged in
      return c.redirect("/auth/protected");
    }
    return next();
  })
  .get("/protected", requireAuth, (c) => c.render(<Logout />))
  .all("/login", (c) => c.render(<Login />, { title: "Login" }))
  .all("/logout", async (c) => {
    await c.get('db').auth.signOut();
    return c.redirect("/");
  })
