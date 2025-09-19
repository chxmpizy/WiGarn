import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const ft = useTranslations('Footer');
  return (
    <div className="bg-primary text-secondary flex items-center justify-around py-5">
      <div className="flex flex-col">
        <h1 className="text-4xl font-extrabold">
          <Image
            src={'/RanAhRai 1.svg'}
            width={120}
            height={120}
            alt="RanAhRai Logo"
          />
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl font-semibold">{ft('contact')}</h1>
        </div>
        <div className="flex flex-col gap-2">
          <h1>
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            063-527-8329
          </h1>
          <h1>
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            rattasat.onn@gmail.com
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{ft('social')}</h1>
        </div>
        <div className="flex gap-5">
          <Link href="#" className="">
            <FontAwesomeIcon icon={faFacebook} className="text-xl" />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faInstagram} className="text-xl" />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faXTwitter} className="text-xl" />
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faDiscord} className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
