import type { IconType } from 'react-icons';
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaTwitch,
  FaSpotify,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa6';

export type Social = {
  name: string;
  href: string;
  icon: IconType;
};

export const SOCIALS: Social[] = [
  { name: 'WhatsApp', href: 'https://wa.me/5583981306043', icon: FaWhatsapp },
  { name: 'E-mail',   href: 'mailto:jonasagrabr@gmail.com',                                    icon: FaEnvelope },
  { name: 'GitHub',    href: 'https://github.com/jonasagra',                                   icon: FaGithub },
  { name: 'LinkedIn',  href: 'https://www.linkedin.com/in/jonasagra/',                         icon: FaLinkedinIn },
  { name: 'X',         href: 'https://x.com/jonasagra',                                        icon: FaXTwitter },
  { name: 'Instagram', href: 'https://instagram.com/jnasagr',                                  icon: FaInstagram },
  { name: 'YouTube',   href: 'https://youtube.com/jonazagra',                                 icon: FaYoutube },
  { name: 'Spotify',   href: 'https://open.spotify.com/intl-pt/artist/1CHO0ZLJs1YX3IlDotU2Be', icon: FaSpotify },
  { name: 'Facebook',  href: 'https://www.facebook.com/jonasagrabr/',                          icon: FaFacebookF },
];
