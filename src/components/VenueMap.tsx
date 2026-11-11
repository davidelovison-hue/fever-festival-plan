import type { TableZoneId } from '../data/tableZones';
import { TABLE_ZONES } from '../data/tableZones';
import './VenueMap.css';

type VenueMapProps = {
  activeZoneId: TableZoneId | null;
  onSelectZone: (zoneId: TableZoneId) => void;
};

type ZoneShape = {
  id: TableZoneId;
  /** Isometric parallelogram points (x,y) around a floor plate. */
  points: string;
  labelX: number;
  labelY: number;
  labelRotate?: number;
};

/**
 * Wireframe isometric floor plan — zones match the table-map reference.
 * Coordinates are in a 640×360 viewBox; shapes are clickable hotspots.
 */
const ZONE_SHAPES: ZoneShape[] = [
  {
    id: 'vip-cielo',
    points: '70,78 150,48 230,78 150,108',
    labelX: 150,
    labelY: 74,
    labelRotate: -18,
  },
  {
    id: 'cristal',
    points: '168,92 230,68 292,92 230,116',
    labelX: 230,
    labelY: 90,
    labelRotate: -18,
  },
  {
    id: 'pista-izquierda',
    points: '150,150 260,108 370,150 260,192',
    labelX: 260,
    labelY: 148,
    labelRotate: -18,
  },
  {
    id: 'pista-derecha',
    points: '280,150 390,108 500,150 390,192',
    labelX: 390,
    labelY: 148,
    labelRotate: -18,
  },
  {
    id: 'palco-izquierdo',
    points: '430,78 510,48 590,78 510,108',
    labelX: 510,
    labelY: 74,
    labelRotate: -18,
  },
  {
    id: 'palco-derecho',
    points: '40,210 120,180 200,210 120,240',
    labelX: 120,
    labelY: 208,
    labelRotate: -18,
  },
  {
    id: 'dj-booth',
    points: '250,230 340,196 430,230 340,264',
    labelX: 340,
    labelY: 228,
    labelRotate: -18,
  },
  {
    id: 'backstage',
    points: '460,220 550,186 640,220 550,254',
    labelX: 550,
    labelY: 218,
    labelRotate: -18,
  },
];

const TONE_FILL: Record<string, string> = {
  dark: '#4a5560',
  mid: '#9aa3ab',
  light: '#e8ebef',
  accent: '#c5ccd3',
};

function toneFor(id: TableZoneId) {
  return TABLE_ZONES.find((z) => z.id === id)?.mapTone ?? 'mid';
}

function shortLabel(id: TableZoneId) {
  const zone = TABLE_ZONES.find((z) => z.id === id);
  if (!zone) return id;
  if (id === 'vip-cielo') return 'V.I.P. CIELO';
  if (id === 'backstage') return 'BACKSTAGE';
  return zone.mapLabel;
}

export function VenueMap({ activeZoneId, onSelectZone }: VenueMapProps) {
  return (
    <div className="venueMap" role="img" aria-label="Mapa de mesas de la sala">
      <svg
        className="venueMapSvg"
        viewBox="0 0 640 320"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="false"
      >
        <defs>
          <linearGradient id="venueFloor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f7f8fa" />
            <stop offset="100%" stopColor="#eef1f4" />
          </linearGradient>
          <filter id="zoneShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Room plate */}
        <polygon
          className="venueMapRoom"
          points="40,120 320,20 600,120 320,220"
          fill="url(#venueFloor)"
          stroke="#cfd5db"
          strokeWidth="1.5"
        />
        {/* Depth edges */}
        <polyline
          points="40,120 40,150 320,250 600,150 600,120"
          fill="none"
          stroke="#d5dbe0"
          strokeWidth="1"
          opacity="0.7"
        />
        <polygon
          points="40,120 40,150 320,250 320,220"
          fill="#e4e8ec"
          stroke="#cfd5db"
          strokeWidth="1"
          opacity="0.85"
        />
        <polygon
          points="320,220 320,250 600,150 600,120"
          fill="#dfe4e9"
          stroke="#cfd5db"
          strokeWidth="1"
          opacity="0.9"
        />

        {ZONE_SHAPES.map((shape) => {
          const active = activeZoneId === shape.id;
          const fill = TONE_FILL[toneFor(shape.id)];
          return (
            <g key={shape.id} className={active ? 'venueMapZone venueMapZone--active' : 'venueMapZone'}>
              <polygon
                points={shape.points}
                fill={fill}
                stroke={active ? '#0a1f26' : '#8b949e'}
                strokeWidth={active ? 2.25 : 1.25}
                filter="url(#zoneShadow)"
                role="button"
                tabIndex={0}
                aria-label={`Seleccionar zona ${shortLabel(shape.id)}`}
                aria-pressed={active}
                onClick={() => onSelectZone(shape.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectZone(shape.id);
                  }
                }}
              />
              <text
                x={shape.labelX}
                y={shape.labelY}
                transform={`rotate(${shape.labelRotate ?? -18} ${shape.labelX} ${shape.labelY})`}
                className={
                  toneFor(shape.id) === 'dark' || toneFor(shape.id) === 'mid'
                    ? 'venueMapLabel venueMapLabel--onDark'
                    : 'venueMapLabel'
                }
                textAnchor="middle"
                dominantBaseline="middle"
                pointerEvents="none"
              >
                {shortLabel(shape.id)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
