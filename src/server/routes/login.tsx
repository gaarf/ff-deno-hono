import { Hono } from "hono";
import { Button, LabeledInput } from "@/components";

const Login = () => {
  return (
    <form method="post" className="flex flex-col gap-4 p-4 items-center">
      <fieldset className="flex flex-col gap-2">
        <LabeledInput label="Email" name="email" />
        <LabeledInput label="Password" name="password" type="password" />
      </fieldset>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default new Hono()
  .get("/", (c) => c.render(<Login />, { title: "Login" }))
  .post("/", (c) => {
    const supabase = c.get("db");
    // const r = await supabase.auth.signInWithPassword({ email, password })
    return c.json(supabase);
  });
