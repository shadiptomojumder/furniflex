import Link from "next/link";
import React from "react";
import {
  FaLinkedin,
  FaSquareGithub,
  FaSquareTwitter,
  FaSquareInstagram,
  FaSquareFacebook,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <main className="pt-16 bg-[#F2F2F2]">
      <div className="mx-auto container">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Link
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <h1 className="text-3xl font-extrabold dark:text-primary">
                Lalon Store
              </h1>
            </Link>
            <div className="mt-6 lg:max-w-sm">
              <p className="text-sm text-gray-800 dark:text-gray-200">
              At Dental Care, we offer a comprehensive range of dental services to meet all your oral health needs. From routine cleanings and fillings to advanced procedures like implants and orthodontics, our experienced team is dedicated to providing you with exceptional care and a healthy smile.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-[#0C0C0C] dark:text-primary">
              Contacts
            </p>
            <div className="flex">
              <p className="mr-1 text-gray-800 dark:text-gray-200 font-medium">Phone :</p>
              <a
                href="tel:+8801796692501"
                target="_blank"
                aria-label="Our phone"
                title="Our phone"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-primary"
              >
                +880 17777 77777
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800 dark:text-gray-200 font-medium">WhatsApp :</p>
              <a
                href=" https://wa.me/+8801796692501"
                target="_blank"
                aria-label="Our phone"
                title="Our phone"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-primary"
              >
                +880 17777 77777
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800 dark:text-gray-200  font-medium">Email :</p>
              <a
                href="mailto:info@growoly.com"
                target="_blank"
                aria-label="Our email"
                title="Our email"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-primary"
              >
                info@dentalcare.com
              </a>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800 dark:text-gray-200  font-medium">Address :</p>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Our address"
                title="Our address"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-primary"
              >
                Dhaka-1206, Bangladesh
              </a>
            </div>
          </div>
          
          <div>
            <span className="text-base font-bold tracking-wide text-gray-900 dark:text-primary">
              Social
            </span>
            <div className="flex items-center mt-1 space-x-3">
              <div className="">
                <a
                  href="https://www.linkedin.com/company/growoly/"
                  target="_blank"
                >
                  <FaLinkedin className="text-3xl dark:hover:text-primary" />
                </a>
              </div>
              <div className="">
                <a
                  href="https://www.facebook.com/growoly?mibextid=ZbWKwL"
                  target="_blank"
                >
                  <FaSquareFacebook className="text-3xl dark:hover:text-primary" />
                </a>
              </div>
              <div className="">
                <a href="#">
                  <FaSquareGithub className="text-3xl dark:hover:text-primary" />
                </a>
              </div>
              <div className="">
                <a href="#">
                  <FaSquareTwitter className="text-3xl dark:hover:text-primary" />
                </a>
              </div>
              <div className="">
                <a href="#">
                  <FaSquareInstagram className="text-3xl dark:hover:text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-5 border-t">
          <p className="text-sm text-gray-600 dark:text-primary font-semibold">
            © Copyright 2024. All rights reserved by Dental Care.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Footer;
