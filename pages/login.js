import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
 
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const { isLoaded, signIn, setActive } = useSignIn();
 
  if (!isLoaded) {
    return null;
  }
 
  async function submit(e) {
    e.preventDefault();
    await signIn
      .create({
        identifier: email,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          console.log(result);
          setActive({ session: result.createdSessionId });
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  }
 
  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="email">Email</label>
        <input className="text-black"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input className="text-black"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button>Sign in</button>
      </div>
    </form>
  );
}