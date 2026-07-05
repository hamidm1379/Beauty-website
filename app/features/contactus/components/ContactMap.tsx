"use client";

import "leaflet/dist/leaflet.css";

import { MapPin, Navigation } from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";

if (L.Icon && L.Icon.Default) {
  delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
}

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const position: [number, number] = [35.7219, 51.3347];

export default function ContactMap() {
  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border
        border-gray-100
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-gray-100
          p-7
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-pink-50
              text-pink-500
            "
          >
            <MapPin size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              موقعیت فروشگاه
            </h2>

            <p className="mt-1 text-gray-500">
              تهران، خیابان ولیعصر، کوچه ششم، پلاک ۱۴
            </p>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=35.7219,51.3347"
          target="_blank"
          rel="noopener noreferrer"
          className="
            hidden
            items-center
            gap-2
            rounded-2xl
            bg-pink-500
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-pink-600
            md:flex
          "
        >
          <Navigation size={18} />
          مسیریابی
        </a>
      </div>

      {/* Map */}

      <div className="relative h-95 w-full">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          dragging={true}
          doubleClickZoom={true}
          zoomControl={true}
          touchZoom={true}
          attributionControl={false}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold">
                  فروشگاه زیبا
                </h3>

                <p className="mt-2 text-sm">
                  تهران، خیابان ولیعصر
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* Floating Card */}

        <div
          className="
            absolute
            right-6
            top-6
            z-1000
            hidden
            w-72
            rounded-3xl
            bg-white/95
            p-5
            shadow-xl
            backdrop-blur
            lg:block
          "
        >
          <h3 className="text-lg font-bold">
            فروشگاه زیبا
          </h3>

          <p className="mt-3 text-sm leading-7 text-gray-500">
            تهران، خیابان ولیعصر، کوچه ششم، پلاک ۱۴
          </p>

          <div className="mt-5 flex items-center gap-2 text-pink-500">
            <MapPin size={18} />

            <span className="text-sm font-medium">
              همه روزه ۹ تا ۲۲
            </span>
          </div>

          <a
            href="https://maps.google.com/?q=35.7219,51.3347"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-pink-500
              py-3
              font-medium
              text-white
              transition
              hover:bg-pink-600
            "
          >
            <Navigation size={18} />
            مسیریابی
          </a>
        </div>
      </div>
    </section>
  );
}