'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';
import Showcode from '@/shared/layout-components/showcode/showcode';
import Link from 'next/link';
import { modal11 } from '@/shared/data/prism/advance-uiprism';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Logo className='w-16' />
          <h1 className='mt-4'>Next.js + Tailwind CSS + TypeScript Starter</h1>
          <p className='mt-2 text-sm text-gray-800'>
            A starter for Next.js, Tailwind CSS, and TypeScript with Absolute
            Import, Seo, Link component, pre-configured with Husky{' '}
          </p>
          <div className="xl:col-span-4 col-span-12">
            <Showcode title="Static Backdrop" code={modal11} customCardClass="custom-box">
              <Link href="#!" className="hs-dropdown-toggle ti-btn ti-btn-primary-full " data-hs-overlay="#staticBackdrop">Launch static backdrop modal
              </Link>
              <div id="staticBackdrop" className="hs-overlay hidden ti-modal  [--overlay-backdrop:static]">
                <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                  <div className="ti-modal-content">
                    <div className="ti-modal-header">
                      <h6 className="modal-title text-[1rem] font-semibold">Modal title</h6>
                      <button type="button" className="hs-dropdown-toggle !text-[1rem] !font-semibold !text-defaulttextcolor" data-hs-overlay="#staticBackdrop">
                        <span className="sr-only">Close</span>
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                    <div className="ti-modal-body px-4">
                      <p>I will not close if you click outside me. Don't even try to
                        press
                        escape key.</p>
                    </div>
                    <div className="ti-modal-footer">
                      <button type="button"
                        className="hs-dropdown-toggle ti-btn  ti-btn-secondary-full align-middle"
                        data-hs-overlay="#staticBackdrop
                                          
                                          ">
                        Close
                      </button>
                      <button type="button" className="ti-btn bg-primary text-white !font-medium">Understood</button>
                    </div>
                  </div>
                </div>
              </div>
            </Showcode>
          </div>
          <p className='mt-2 text-sm text-gray-700'>
            <ArrowLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
              See the repository
            </ArrowLink>
          </p>

          <ButtonLink className='mt-6' href='/components' variant='light'>
            See all components
          </ButtonLink>
          <ButtonLink className='mt-6' href='/auth' variant='light'>
            login
          </ButtonLink>
          <UnstyledLink
            href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter'
            className='mt-4'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              width='92'
              height='32'
              src='https://vercel.com/button'
              alt='Deploy with Vercel'
            />
          </UnstyledLink>

          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
              Theodorus Clarence
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
