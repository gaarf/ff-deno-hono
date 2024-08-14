import { Hono } from "hono";

const Login = () => {

  return (
    <>
      Login form
    </>
  );
};

export default new Hono()
  .get("/", (c) =>
    c.render(
      <Login />,
      { title: "Login" },
    ));
