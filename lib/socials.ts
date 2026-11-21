
import type { IconType } from 'react-icons';
import type { ComponentType } from 'react';
import { SiWikipedia } from 'react-icons/si';
import { TbBrandMinecraft } from 'react-icons/tb';
import { CreeperIcon } from '@/components/CreeperIcon';
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
  icon: IconType | ComponentType<{ className?: string }>;
};

export const LINKEDIN_URL = 'https://www.linkedin.com/in/jonasagra/';

export const Socials: Social[] = [
  { name: 'WhatsApp', href: 'https://wa.me/5583981306043', icon: FaWhatsapp },
  { name: 'E-mail', href: 'mailto:jonasagrabr@gmail.com', icon: FaEnvelope },
  { name: 'GitHub', href: 'https://github.com/jonasagra', icon: FaGithub },
  { name: 'X', href: 'https://x.com/jonasagra', icon: FaXTwitter },
  { name: 'Instagram', href: 'https://instagram.com/jnasdev', icon: FaInstagram },
  // Removidos da aba principal: LinkedIn (fica na aba Nubank) e YouTube do Corelakes (fica na aba Minecraft)
  // Oculto: { name: 'Spotify', href: 'https://open.spotify.com/intl-pt/artist/1CHO0ZLJs1YX3IlDotU2Be', icon: FaSpotify },
  { name: 'Facebook', href: 'https://www.facebook.com/jonasagrabr/', icon: FaFacebookF },
];

// Links exibidos na aba Nubank: LinkedIn + os da aba principal
export const NubankSocials: Social[] = [
  { name: 'LinkedIn', href: LINKEDIN_URL, icon: FaLinkedinIn },
  ...Socials,
];

// Links exibidos na aba Minecraft (Corelakes)
export const MinecraftSocials: Social[] = [
  { name: 'Corelakes', href: 'https://corelakes.jonasagra.com.br', icon: CreeperIcon },
  { name: 'Minecraft Wiki', href: 'https://br.minecraft.wiki/User:Corelakes', icon: SiWikipedia },
  { name: 'NameMC', href: 'https://namemc.com/profile/Corelakes', icon: TbBrandMinecraft },
  { name: 'YouTube', href: 'https://youtube.com/@corelakes', icon: FaYoutube },
  { name: 'Twitch', href: 'https://www.twitch.tv/corelakes', icon: FaTwitch },
  { name: 'X', href: 'https://x.com/corelakes', icon: FaXTwitter },
];
