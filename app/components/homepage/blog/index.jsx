"use client";
// @flow strict
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import BlogCard from './blog-card';

function Blog() {
  const [showMore, setShowMore] = useState(false);

  const cards = [
    { image: '/faabor.png', logo: '/faabor.png', title: 'Faabor — Food Donate', date: 'Apr 2024', hearts: 82, comments: 3, images: ['/faabor.png'] },
    { image: '/splashlogo.png', logo: '/splashlogo.png', title: 'Kiddo Call', date: 'July 2024', hearts: 56, comments: 5, images: ['/splashlogo.png'] },
    { image: '/nivethaapp.jpg', logo: '/nivethaapp.jpg', title: 'Worknest', date: 'Sept 2024', hearts: 96, comments: 7, images: ['/nivethaapp.png'] },
    { image: '/studentcollege.png', logo: '/studentcollege.png', title: 'Student Registration Hub', date: 'Mar 2025', hearts: 124, comments: 3, images: ['/studentcollege.png'] }
  ];

  return (
    <div id='blogs' className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl  opacity-20"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Project Images
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {cards.slice(0, showMore ? 4 : 3).map((c, i) => (
          <BlogCard
            key={i}
            image={c.image}
            logo={c.logo}
            title={c.title}
            date={c.date}
            hearts={c.hearts}
            comments={c.comments}
            images={c.images}
          />
        ))}
      </div>

      <div className="flex justify-center  mt-5 lg:mt-12">
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
          role="button"
        >
          <span>{showMore ? 'View Less' : 'View More'}</span>
          <FaArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Blog;