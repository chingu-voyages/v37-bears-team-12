import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function signInWithEmail() {
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <>
      <form>
        <label>
          Email:
          <input type="text" name="email" onChange={() => setEmail()} />
        </label>
        <label>
          Password:
          <input type="text" name="password" onChange={() => setPassword()} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div onClick={() => signInWithEmail()}>Sign In</div>
      <div onClick={() => signOut()}>Sign Out</div>
    </>
  );
}
