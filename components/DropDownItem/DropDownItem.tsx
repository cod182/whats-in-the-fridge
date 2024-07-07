'use client'

import { FaCaretDown, FaLink } from 'react-icons/fa';

import { FiTarget } from 'react-icons/fi';
import { useState } from 'react';

type DropDownProps = {
  title: string;
  additionalText?: string;
  data?: itemProps[];
  link?: string;
  disabled: boolean | false;
  grid: boolean | false;
  citationNumber?: string;
  citationLink?: string;
  listStyled?: boolean;
};

type itemProps = {
  text: string;
  link: string;
};

const DropDownItem = ({
  title,
  additionalText,
  data,
  link,
  disabled,
  grid,
  citationNumber,
  citationLink,
  listStyled,
}: DropDownProps) => {
  const [fullInfo, setFullInfo] = useState(false);
  const handleFullInfoToggle = () => {
    fullInfo ? setFullInfo(false) : setFullInfo(true);
  };

  if (disabled) {
    return (
      <button type="button" className="w-full cursor-default">
        <div className="w-full min-h-[50px] h-auto border-2 border-slate-500 text-[#846bb9] mb-[10px] rounded-xl flex justify-between">
          <div className="w-full flex justify-start items-center pt-1 pl-2">
            <h2 className="text-2xl">{title}</h2>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`h-auto ease duration-1000 transition-all w-full border-2 border-slate-500 text-primary mb-[10px] rounded-xl flex flex-col overflow-hidden cursor-pointer`}
    >
      <div
        className={`w-full flex justify-between items-center pt-1 pl-2 ${grid && 'items-center'
          }`}
      >
        <a
          className={`w-full flex justify-between items-center pt-1 pl-2 ${grid && 'items-center'
            }`}
          href={link}
          onClick={(e) => {
            !link && e.preventDefault();
            handleFullInfoToggle();
          }}
        >
          <h2 className="text-2xl">{title}</h2>
          <div>
            {link ? (
              <FaLink className="w-[25px] h-[25px] mr-[5px]" />
            ) : (
              <FaCaretDown
                className={`w-[40px] h-[40px] transition-all ease duration-500 ${fullInfo && 'rotate-180'
                  }`}
              />
            )}
          </div>
        </a>
      </div>

      {data && (
        <div
          className={`px-4 ease duration-1000 transition-all relative mt-2 ${fullInfo ? 'max-h-[1000px]' : 'max-h-[0px]'
            }`}
        >
          {additionalText && (
            <p className={`text-gray-500 pb-4 ${fullInfo && ''}`}>
              {additionalText}
            </p>
          )}
          <ul
            className={`${grid
              ? 'grid grid-cols-1 sm:grid-cols-2 relative'
              : 'flex flex-col justify-start items-start relative'
              } mx-auto mb-[20px] text-start text-gray-600`}
          >
            {data &&
              data.map(({ text, link }: any, index: number) => (
                <li
                  key={index}
                  className="flex mb-1 ml-6 items-start justify-start flex-row"
                >
                  <span
                    className={`flex items-center ${!listStyled && 'hidden'}`}
                  >
                    <FiTarget className="h-[24px]" />
                  </span>
                  <a target='_blank' rel='noopener noreferrer' href={link} className="flex ml-1 hover:text-blue-700">{text}</a>
                </li>
              ))}
            {citationNumber && (
              <a
                href={`${citationLink}#${citationNumber}`}
                className="text-[#846bb9] hover:text-[#6bb2b9] absolute right-0 bottom-0"
              >
                [{citationNumber}]
              </a>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownItem;
