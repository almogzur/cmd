import Head from "next/head";
import WelcomePage from "@/markup/land_page";

export default function Home() {
  return (
    <>
      <Head>
        <title>Check My Desk</title>
        <meta name="description" content="Check My Desk" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/light_logo.png"  />
      </Head>
    <WelcomePage/>
    </>
  );
}
