import { AuthProvider } from "../components/Auth";
import { supabase } from "../utils/supabaseClient";
import "./../style.css";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={"dark"}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  );
}
