import Link from 'next/link'
import { Copyright, Dot } from 'lucide-react'
import GithubIcon from '../icons/GithubIcon'
import LeetcodeIcon from '../icons/LeetcodeIcon'
import LinkedinIcon from '../icons/LinkedinIcon'

export default function Footer() {
  return (
    <footer className="border-t bg-[#38175240] backdrop-blur mt-24">
      <div className="px-8 pt-4 md:px-8 py-12">
        {/* GRID LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-white font-bold text-xl">VidStream Pro</h2>

            <p className="text-neutral-200 text-sm">
              Stream trending videos, discover new creators and enjoy
              entertainment without limits.
            </p>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>

            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Trending
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Latest
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Subscriptions
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Recommended
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>

            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  About
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Careers
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Press
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>

            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="#" className="hover:text-white transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* SOCIAL + COPYRIGHT */}
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="flex items-center text-neutral-500 text-xs gap-2">
            <Copyright size={15} /> 2026 VidStream Pro <Dot /> Built by Devraj
            Songara
          </p>

          <div className="flex items-center gap-4 text-neutral-400">
            <Link href="#" className="hover:text-white transition">
              <GithubIcon className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
            </Link>

            <Link href="#" className="hover:text-white transition">
              <LeetcodeIcon className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
            </Link>

            <Link href="#" className="hover:text-white transition">
              <LinkedinIcon className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
