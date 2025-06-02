"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Flowers from "@/DB/data";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderSearchResults = () =>
    query && (
      <div className="absolute left-0 top-full w-full bg-white rounded-3xl p-2 shadow z-50">
        <ul className="max-h-40 overflow-y-auto">
          {Flowers.filter((flower) =>
            flower.title.toLowerCase().includes(query.toLowerCase())
          ).map((flower) => (
            <li
              key={flower.id}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery("");
                window.location.href = `/flowers/${flower.id}`;
              }}
            >
              <span>{flower.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="md:w-[90vw] mx-auto mt-3 h-16 bg-neutral-100 rounded-3xl">
      <nav className="flex justify-between items-center h-full px-4 relative">
        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/">
            <Image
              src="/logo.png"
              className="z-10 invert-100"
              alt="logo"
              width={150}
              height={200}
            />
          </Link>
          <ul className="hidden md:flex gap-5 text-black text-lg">
            <li>
              <Link href="/">OCASSION</Link>
            </li>
            <li>
              <Link href="/">ROSES</Link>
            </li>
          </ul>
        </div>

        {/* Center: Search (desktop) */}
        <div className="hidden md:flex flex-1 justify-center relative" ref={searchRef}>
          <div className="relative w-72">
            <input
              type="text"
              placeholder="Search"
              className="outline-1 rounded-3xl text-black p-2 pl-8 bg-white w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="absolute left-2 top-2.5">
              <Image src="/search.svg" width={20} height={20} alt="search" />
            </span>
            {renderSearchResults()}
          </div>
        </div>

        {/* Right: Auth & Cart/Profile */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/user">
            <Image src="/user.svg" width={20} height={20} alt="user" />
          </Link>
          <Link href="/cart">
            <Image src="/cart.svg" width={20} height={20} alt="cart" />
          </Link>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="default">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile: Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="p-2"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Open search"
          >
            <Image src="/search.svg" width={24} height={24} alt="search" />
          </button>
          <button
            className="p-2"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile: Search bar dropdown */}
        {mobileSearchOpen && (
          <div className="absolute left-0 top-16 w-full bg-white rounded-b-3xl shadow-md z-40 px-4 pb-4" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="outline-1 rounded-3xl text-black p-2 pl-8 bg-white w-full mt-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="absolute left-2 top-4">
                <Image src="/search.svg" width={20} height={20} alt="search" />
              </span>
              {renderSearchResults()}
            </div>
          </div>
        )}

        {/* Mobile: Menu dropdown */}
        {mobileMenuOpen && (
          <div className="absolute right-2 top-16 w-56 bg-white rounded-3xl shadow-md z-40 flex flex-col gap-2 p-4">
            <ul className="flex flex-col gap-3 text-black text-lg">
              <li>
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  OCASSION
                </Link>
              </li>
              <li>
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  ROSES
                </Link>
              </li>
              <li>
                <Link href="/user" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex gap-2 items-center">
                    <Image src="/user.svg" width={20} height={20} alt="user" />
                    <span>Profile</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex gap-2 items-center">
                    <Image src="/cart.svg" width={20} height={20} alt="cart" />
                    <span>Cart</span>
                  </div>
                </Link>
              </li>
            </ul>
            <div className="flex flex-col gap-2 mt-2">
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </SignInButton>
                <SignUpButton>
                  <Button variant="default" className="w-full">Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;