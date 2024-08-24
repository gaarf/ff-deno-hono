import { Hono, type Context } from "hono";
import { setMessage } from "@/server/layout/Message.tsx";
import { userPromise } from "@/supabase/server.ts";
import { createMiddleware } from "hono/factory";
import { hybrid } from "@/client/islands/index.ts";
import { useMessage } from "@/server/layout/Message.tsx";

const redirIfLoggedIn = createMiddleware(async (c, next) => {
  const user = await userPromise(c);
  if (user) {
    // already logged in
    return c.redirect("/secret");
  }
  return next();
});

const getCreds = async (c: Context) => {
  const body = await c.req.formData();
  const email = body.get("email")?.toString();
  const password = body.get("password")?.toString();
  const password2 = body.get("password2")?.toString();
  return { email, password, password2 };
};

function Form({ signup = false }) {
  const message = useMessage();
  return (
    <>
      {message}
      <hybrid.AuthForm signup={signup} />
    </>
  )
}

export default new Hono()
  .all("/", (c) => c.redirect("/auth/login"))
  .all("/signup", redirIfLoggedIn)
  .post("/signup", async (c, next) => {
    const { email, password, password2 } = await getCreds(c);
    if (!email || !password || !password2) {
      console.log({ email, password, password2 });
      setMessage(c, "Missing credentials!", "warning");
      return next();
    }
    if (password !== password2) {
      setMessage(c, "Passwords do not match!", "warning");
      return next();
    }
    const { error, data } = await c.get("db").auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(c, error.message, "danger");
      return next();
    }

    return c.json(data);
  })
  .all("/signup", (c) => c.render(<Form signup />, { title: "Sign up" }))
  .all("/login", redirIfLoggedIn)
  .post("/login", async (c, next) => {
    const { email, password } = await getCreds(c);
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
  .all("/login", (c) => c.render(<Form />, { title: "Login" }))
  .all("/logout", async (c) => {
    await c.get("db").auth.signOut();
    return c.redirect("/");
  });
