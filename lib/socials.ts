
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

// Redes pessoais disponíveis. Para mostrar uma numa aba, é só incluir na lista da aba.
const Email: Social = { name: 'E-mail', href: 'mailto:jonasagrabr@gmail.com', icon: FaEnvelope };
export const PersonalSocials = {
  whatsapp: { name: 'WhatsApp', href: 'https://wa.me/5583981306043', icon: FaWhatsapp },
  github: { name: 'GitHub', href: 'https://github.com/jonasagra', icon: FaGithub },
  linkedin: { name: 'LinkedIn', href: LINKEDIN_URL, icon: FaLinkedinIn },
  x: { name: 'X', href: 'https://x.com/jonasagra', icon: FaXTwitter },
  instagram: { name: 'Instagram', href: 'https://instagram.com/jnasagra', icon: FaInstagram },
  facebook: { name: 'Facebook', href: 'https://www.facebook.com/jonasagrabr/', icon: FaFacebookF },
  // spotify: { name: 'Spotify', href: 'https://open.spotify.com/intl-pt/artist/1CHO0ZLJs1YX3IlDotU2Be', icon: FaSpotify },
} satisfies Record<string, Social>;

// Links da aba principal: redes pessoais (sem LinkedIn e sem as do Corelakes)
export const Socials: Social[] = [
  PersonalSocials.whatsapp,
  Email,
  PersonalSocials.github,
  PersonalSocials.x,
  PersonalSocials.instagram,
  PersonalSocials.facebook,
];

// Links da aba Nubank: só o e-mail (o LinkedIn fica no botão do card)
export const NubankSocials: Social[] = [
  Email,
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
