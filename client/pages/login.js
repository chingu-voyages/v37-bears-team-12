import Link from "next/link";
import useSWR from "swr";
import { Auth, Card, Typography, Space, Button, Icon } from "@supabase/ui";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import dashboard from "./dashboard";

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

const Index = () => {
  const { user, session } = Auth.useUser();
  const { data, error } = useSWR(
    session ? ["/api/getUser", session.access_token] : null,
    fetcher
  );
  const [authView, setAuthView] = useState("sign_in");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") setAuthView("forgotten_password");
        // if (event === "USER_UPDATED")
        //   setTimeout(() => setAuthView("sign_in"), 1000);
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );
    
    
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  if(user){
    location.assign('/dashboard');
  }

  const View = () => {
    if (!user)
      return (
        <Space direction="vertical" size={8}>
          <div>
            <div
            className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4 text-white"
            >
            Welcome to Coffee Note
            </div>
          </div>
          <div className="text-center">
            <Auth
                supabaseClient={supabase}
                view={authView}
                socialLayout="horizontal"
                socialButtonSize="xlarge"
            />
          </div>
        </Space>
      );

    return (
      <Space direction="vertical" size={6}>
        {authView === "forgotten_password" && (
          <Auth.UpdatePassword supabaseClient={supabase} />
        )}
        {/* {user && (
          <>
            <Typography.Text>You're signed in</Typography.Text>
            <Typography.Text strong>Email: {user.email}</Typography.Text>

            <Button
              icon={<Icon type="LogOut" />}
              type="outline"
              onClick={() => supabase.auth.signOut()}
            >
              Log out
            </Button>
            {error && (
              <Typography.Text type="danger">
                Failed to fetch user!
              </Typography.Text>
            )}
            {data && !error ? (
              <>
                <Typography.Text type="success">
                  User data retrieved server-side (in API route):
                </Typography.Text>

                <Typography.Text>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </Typography.Text>
              </>
            ) : (
              <div>Loading...</div>
            )}

            <Typography.Text>
              <Link href="/profile">
                <a>SSR example with getServerSideProps</a>
              </Link>
            </Typography.Text>
          </>
        )} */}
      </Space>
    );
  };

  return (

    <div className="h-screen bg-cover bg-[url('/images/coffee-notebook.jpg')] ">
        <div className="flex flex-col h-screen">
            <header className="flex justify-between items-center">
                <span className="px-5 text-xl">LOGO</span>
                <nav className="text-sm md:text-xl py-4">
                    <ul className="flex">
                        <Link href="/">
                            <a className="bg-white rounded-xl px-2 py-1 mx-3 hover:text-white hover:bg-transparent">Home</a>
                        </Link>
                    </ul>
                </nav>
            </header>
            
            <main className="flex items-center justify-center h-5/6">
                <div className="w-full max-w-md">
                  <Card>
                    <View />
                  </Card>
                </div>
            </main>
        
        </div>
    </div>

  );
};

export default Index;

