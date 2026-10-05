import type { Office } from "@/lib/content";

/*
 * Stylised equirectangular map (20°E–140°E, 70°N–10°N, 5 px per degree).
 * Geography is absolute, so the map is deliberately NOT mirrored in RTL;
 * labels are centred so text direction cannot shift them.
 */
const project = (lon: number, lat: number) => ({ x: (lon - 20) * 5, y: (70 - lat) * 5 });

const hubs: Record<string, { lon: number; lat: number; labelDy: number }> = {
  moscow: { lon: 37.6, lat: 55.75, labelDy: 30 },
  dubai: { lon: 55.3, lat: 25.2, labelDy: 30 },
  shanghai: { lon: 121.5, lat: 31.2, labelDy: -20 },
};

/** Other cities we cover, drawn as small dots. */
const cities: [number, number][] = [
  [30.3, 59.9], [49.1, 55.8], [60.6, 56.8], [76.9, 43.2], [46.7, 24.7], [51.5, 25.3],
  [48, 29.4], [58.4, 23.6], [50.6, 26.2], [116.4, 39.9], [114.1, 22.5], [104.1, 30.7],
];

const routes: [string, string, { x: number; y: number }][] = [
  ["moscow", "shanghai", { x: 300, y: 10 }],
  ["dubai", "shanghai", { x: 350, y: 300 }],
  ["moscow", "dubai", { x: 70, y: 160 }],
];

export function RouteMap({ offices, label }: { offices: Office[]; label: string }) {
  const cityName = new Map(offices.map((office) => [office.id, office.city]));
  const point = (id: string) => project(hubs[id].lon, hubs[id].lat);

  return (
    <svg viewBox="0 0 600 300" role="img" aria-label={label} className="h-auto w-full">
      <defs>
        <pattern id="map-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill="currentColor" />
        </pattern>
        <radialGradient id="map-fade" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="map-mask">
          <rect width="600" height="300" fill="url(#map-fade)" />
        </mask>
      </defs>

      <g mask="url(#map-mask)" className="text-white/15">
        <rect width="600" height="300" fill="url(#map-dots)" />
        {[50, 100, 150, 200, 250].map((y) => (
          <path key={y} d={`M0 ${y}H600`} stroke="currentColor" strokeWidth="0.5" />
        ))}
        {[100, 200, 300, 400, 500].map((x) => (
          <path key={x} d={`M${x} 0V300`} stroke="currentColor" strokeWidth="0.5" />
        ))}
      </g>

      {cities.map(([lon, lat]) => {
        const { x, y } = project(lon, lat);
        return <circle key={`${lon}-${lat}`} cx={x} cy={y} r="2.5" className="fill-ink-300/60" />;
      })}

      {routes.map(([from, to, control]) => {
        const a = point(from);
        const b = point(to);
        return (
          <path
            key={`${from}-${to}`}
            d={`M${a.x} ${a.y}Q${control.x} ${control.y} ${b.x} ${b.y}`}
            fill="none"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
            className="route-flow stroke-brass-300/70"
          />
        );
      })}

      {Object.entries(hubs).map(([id, hub]) => {
        const { x, y } = project(hub.lon, hub.lat);
        return (
          <g key={id}>
            <circle cx={x} cy={y} r="14" className="hub-pulse fill-brass-300/30" />
            <circle cx={x} cy={y} r="5.5" className="fill-brass-300" />
            <text
              x={x}
              y={y + hub.labelDy}
              textAnchor="middle"
              className="fill-white text-[15px] font-semibold"
            >
              {cityName.get(id)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
