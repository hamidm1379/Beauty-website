import { bannerService } from "@/lib/services/banner.service";
import HeroSliderClient from "./HeroSliderClient";

export default async function HeroSlider() {
  const banners = await bannerService.findHeroBanners();

  return <HeroSliderClient banners={banners} />;
}