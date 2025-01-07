import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-300  text-black py-3 mt-0  dark:bg-gray-800 dark:text-white ">

      <div className="container mx-auto flex justify-between items-center px-4 ">

        <p className="text-sm">
          &copy; {new Date().getFullYear()} CodeTutor. All rights reserved.
        </p>

        <div className="flex space-x-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-white dark:hover:text-yellow-600 transition-colors duration-300">
            GitHub
          </a>

          <a
            onClick={() => document.getElementById('aboutUsModal').showModal()}
            className=" hover:text-white  dark:hover:text-yellow-600 transition-colors duration-300">
            About Us
          </a>

          <a
            onClick={() => document.getElementById('contactModal').showModal()}
            className=" hover:text-white  dark:hover:text-yellow-600  transition-colors duration-300">
            Contact
          </a>

        </div>
      </div>

      <dialog id="contactModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-slate-200 dark:bg-gray-700 dark:text-white">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <p className="mt-2 text-sm">
            We are always happy to hear from our Users
          </p>
          <p className="mt-2 text-sm">
            If you have any Questions, Feedback, or Suggestions, feel free to reach out to Us !
          </p>
          <p className="mt-8 text-base">
            Email : <a href="mailto:  contact@codetutor.com" className="text-blue-500 dark:text-blue-400"> contact@codetutor.com </a>
          </p>
          <p className="text-xl font-semibold mt-12 text-gray-700 dark:text-white">
            You can also find us on Social Media:
          </p>
          <div className="flex mb-6 mt-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mb-2 mr-3">
              <span class="[&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512">
                  <path
                    d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                </svg>
              </span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-5 justify-start mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512">

                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="">
              <span class="[&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 488 512">
                  <path
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </span>
            </a>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn rounded-3xl w-20 border hover:border-black bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>



      <dialog id="aboutUsModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-slate-200 dark:bg-gray-700 dark:text-white">
          <h2 className="text-2xl font-bold mb-6">About Us</h2>
          <p className="mt-2 text-sm">
            CodeTutor is an Innovative Platform designed to help users learn Coding Languages. Whether you are a Beginner or an Advanced Programmer, we offer Tailored lessons and real-time Coding Practice to make learning more Engaging and Effective.
          </p>
          <p className="mt-4 text-sm">
            Our mission is to empower Individuals with the Skills they need to succeed in the ever-evolving Tech Industry. We believe in making Coding Accessible to Everyone, regardless of their background.
          </p>
          <p className="mt-4 text-sm">
            Developed With ❤️ by Akshat
          </p>
          <div className="modal-action">
            <form method="dialog" >
              <button className="btn rounded-3xl w-20 border hover:border-black bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>

    </footer>
  );
};

export default Footer;
