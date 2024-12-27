import { Dot } from 'lucide-react';
import { useEffect, useState } from 'react';

const FullscreenButton = () => {
   const [isFullscreen, setIsFullscreen] = useState(false);


   const toggleFullscreen = () => {
      if (document.fullscreenElement) {
         document.exitFullscreen();
         setIsFullscreen(false);
      } else {
         document.documentElement.requestFullscreen();
         setIsFullscreen(true);
      }
   };

   return (
      <button
         className=""
         onClick={toggleFullscreen}>
         {isFullscreen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M16 8L21 3M21 3H16M21 3V8M8 8L3 3M3 3L3 8M3 3L8 3M8 16L3 21M3 21H8M3 21L3 16M16 16L21 21M21 21V16M21 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
         ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M8 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M8 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V16M21 8V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H16M21 16V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
         )}
      </button>
   );
};

export default function TopBar({ toggle, setToggle }) {
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown-menu')) {
         setDropdownOpen(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dropdownOpen]);

   return (
      <div
         className='flex relative w-full transition-all duration-300 items-center top-0 justify-between  border-b border-b-[#dededed2] z-50 py-3'
         style={{
            height: '80px',

         }}
      >
         {toggle && <div className='flex items-center gap-8'>
            <button onClick={() => setToggle(!toggle)} className="">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </button>
         </div>}

         <div className="relative w-full max-w-sm">
            <input
               type="text"
               placeholder="Search"
               className="py-[10px] ps-[50px] bg-transparent transition-all duration-300 focus:bg-grayWhite !bg-opacity-10 backdrop-blur-lg pe-5  w-full outline-none  rounded-[4px]"
            />
            <span className="absolute left-4 transform -translate-y-1/2 top-1/2 ">
               <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                     stroke="#B4B4B4"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </span>
         </div>
         <div className='flex items-center gap-10'>
            <button className='bg-[#ff923325]  text-nOrange p-2 relative '><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M14 21H10M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
               <span className='absolute text-[#ff7900] right-0 -top-1 z-50'><Dot /></span>
            </button>
            <div className='pe-1'>
               <FullscreenButton />
            </div>
         </div>

      </div >
   );
}
