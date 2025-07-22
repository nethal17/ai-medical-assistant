import React from "react";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col items-start justify-center gap-10 px-6 text-gray-500 bg-white border-b md:flex-row md:px-16 lg:px-32 py-14 border-gray-500/30">
        <div className="w-4/5">
        <Link href="/" className="flex items-center gap-1">
                        <div className=" bg-white rounded">
                            <HeartHandshake className="w-6 h-6 text-green-700" />
                        </div>
                        <span className="text-xl font-bold font-mono text-black">
                            <span className="text-green-700">Medi</span>Care
                        </span>
                    </Link>
            <p className="mt-6 text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
            </p>
        </div>

        <div className="flex items-center justify-start w-1/2 md:justify-center">
          <div>
            <h2 className="mb-5 font-medium text-green-700">Company</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="transition hover:underline" href="#">Home</a>
              </li>
              <li>
                <a className="transition hover:underline" href="#">About us</a>
              </li>
              <li>
                <a className="transition hover:underline" href="#">Contact us</a>
              </li>
              <li>
                <a className="transition hover:underline" href="#">Privacy policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-start justify-start w-1/2 md:justify-center">
          <div>
            <h2 className="mb-5 font-medium text-green-700">Get in touch</h2>
            <div className="space-y-2 text-sm">
              <p>+94 760391736</p>
              <p>medicare.ai@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-xs text-center bg-white md:text-sm text-black">
        Copyright 2025 © MediCare.ai All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;