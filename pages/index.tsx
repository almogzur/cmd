'use client';

import { useWindowSize } from '@/context/window_size';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const MobileHome = dynamic(() => import('@/mobile_ver/mob_pages_markup/mob_main_page'));
const DesktopHome = dynamic(() => import('@/desktop_ver/desk_pages_markup/desk_main_page'));

export default function Home() {

  const { isMobile } = useWindowSize();

  const Page = isMobile ? MobileHome : DesktopHome

  return (
    <>
      <Head>
        <title>Check My Desk {isMobile ? 'Mobile' : 'Desktop'}</title>
        <meta name="description" content="Check My Desk" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/light_logo.png" />
      </Head>
        <Page/>
    </>
  );
}
