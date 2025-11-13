"use client";
// @flow strict
import Image from 'next/image';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

function BlogCard({
  image = '/faabor.png',
  logo = '/splashlogo.png',
  title = 'Faabor — Food Donate',
  date = 'Oct 2025',
  hearts = 124,
  comments = 8,
  readTime = '5 Min Read'
}) {

  return (
    <div className="border border-[#1d293a] hover:border-[#464c6a] transition-all duration-500 bg-[#1b203e] rounded-lg relative group">
      <div className="h-44 lg:h-52 w-auto cursor-pointer overflow-hidden rounded-t-lg">
        <Image
          src={image}
          height={1080}
          width={1920}
          alt={title}
          className='h-full w-full group-hover:scale-110 transition-all duration-300'
        />
      </div>

      <div className="p-2 sm:p-3 flex flex-col">
        <div className="flex justify-between items-center text-[#16f2b3] text-sm">
          <p>{date}</p>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1">
              <BsHeartFill />
              <span>{hearts}</span>
            </p>
            <p className="flex items-center gap-1">
              <FaCommentAlt />
              <span>{comments}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 my-2 lg:my-3">
          <Image src={logo} width={48} height={48} alt="logo" className="rounded-full" />
          <p className='cursor-default text-lg text-white sm:text-xl font-medium'>{title}</p>
        </div>

        <p className='mb-2 text-sm text-[#16f2b3]'>{readTime}</p>

        <div className="flex items-center gap-3">
          {/* navigate to project page to view images */}
          <a href={`/projects/${encodeURIComponent(title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'))}`} className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded-md text-sm no-underline inline-block">
            View Image
          </a>
        </div>

      </div>
    </div>
  );
};

export default BlogCard;