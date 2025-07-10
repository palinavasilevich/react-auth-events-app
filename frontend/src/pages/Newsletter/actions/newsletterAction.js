export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  console.log(data);

  if (!email) {
    return { ok: false, error: "Please enter your email address." };
  }

  // send to backend newsletter server ...
  console.log(email);
  return { ok: true, message: "Signup successful!" };
}
