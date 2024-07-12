import { TfiYoutube } from 'react-icons/tfi';
import { FaRedditAlien, FaTiktok, FaFacebook } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';
import { FaXTwitter, FaSquareThreads, FaWeixin } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';
import { RiWechatChannelsLine } from 'react-icons/ri';

const baseSiteConfig = {
  name: 'AI Comic Workshop',
  description: 'Create captivating comics with AI-powered tools. Input your story, generate storyboards, and output a stunning poster - all in one seamless workflow.',
  url: 'https://ai-comic-workshop.com',
  ogImage: 'https://ai-comic-workshop.com/logo.png',
  metadataBase: '/',
  keywords: [
    'ai comic generator',
    'comic creation tool',
    'ai-powered comics',
    'storyboard generator',
    'comic poster maker',
    'ai comic workshop'
  ],
  authors: [
    {
      name: 'Dify-Demo-Team4',
      url: 'https://dify.com'
    }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/logo.png',
    apple: '/logo.png'
  }
};

export const SiteConfig = {
	...baseSiteConfig,
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: baseSiteConfig.url,
		title: baseSiteConfig.name,
		description: baseSiteConfig.description,
		siteName: baseSiteConfig.name,
	},
	twitter: {
		card: 'summary_large_image',
		title: baseSiteConfig.name,
		description: baseSiteConfig.description,
		images: [`${baseSiteConfig.url}/og.png`],
		creator: baseSiteConfig.creator,
	},
};
