import React, { useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// تعریف تایپ برای props
interface MapContainerProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  markerText?: string;
  className?: string;
}

// تعریف تایپ برای ref
type MapRefType = HTMLDivElement | null;

// آیکون سفارشی برای marker
const createCustomIcon = () => {
  return L.divIcon({
    html: `<div class="relative" aria-label="موقعیت نمایندگی" role="img">
      <div class="w-12 h-12 bg-red-600 rounded-full opacity-20 animate-ping"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>`,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
    className: "custom-marker"
  });
};

function MapContainer({ 
  latitude, 
  longitude, 
  zoom = 13, 
  markerText = "موقعیت نمایندگی",
  className = ""
}: MapContainerProps) {
  const mapRef = useRef<MapRefType>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // مقداردهی اولیه نقشه
    mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], zoom);

    // اضافه کردن tile layer (نقشه پایه)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    // اضافه کردن marker با آیکون سفارشی
    const customIcon = createCustomIcon();
    markerRef.current = L.marker([latitude, longitude], { icon: customIcon })
      .addTo(mapInstanceRef.current!)
      .bindPopup(`<div class="text-right p-2">
        <strong class="block text-lg">${markerText}</strong>
        <span class="block text-sm text-gray-600">عرض جغرافیایی: ${latitude.toFixed(6)}</span>
        <span class="block text-sm text-gray-600">طول جغرافیایی: ${longitude.toFixed(6)}</span>
      </div>`);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, zoom, markerText]);

  // به‌روزرسانی موقعیت marker زمانی که props تغییر می‌کند
  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current) {
      const newLatLng = new L.LatLng(latitude, longitude);
      markerRef.current.setLatLng(newLatLng);
      mapInstanceRef.current.setView(newLatLng, zoom);
    }
  }, [latitude, longitude, zoom]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      

      {/* کانتینر نقشه */}
      <div 
        ref={mapRef}
        className="w-full h-[500px] rounded-xl shadow-lg border border-gray-300 overflow-hidden"
      />

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        
        .leaflet-popup-content {
          margin: 13px 19px;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          text-align: right;
          direction: rtl;
        }
        
        .leaflet-control-attribution {
          font-size: 9px;
        }
      `}</style>
    </div>
  );
}

export default MapContainer;