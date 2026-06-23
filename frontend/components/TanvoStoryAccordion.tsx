import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Design tokens
const T = { gold: '#C9A84C', ink: '#0D0B0A', muted: 'rgba(13,11,10,0.5)', border: '#E2D9C8', red: '#780000' } as const;

interface WeaverInfo { name: string; generation: string; location: string; story: string; }
export interface StoryProduct {
  weave?: string;
  careInstructions?: string;
  weaverInfo?: WeaverInfo;
}

const CARE = [
  'Dry clean recommended for first wash to lock colours.',
  'Store wrapped in soft muslin or cotton cloth.',
  'Avoid metal hangers — refold periodically to prevent crease wear.',
  'Iron on low heat under a protective cotton layer.',
  'Place dried neem leaves in storage to deter moths naturally.',
];

export const TanvoStoryAccordion: React.FC<{ product: StoryProduct }> = ({ product: p }) => {
  const [open, setOpen] = useState<string | null>(null);
  const tog = (id: string) => setOpen(o => o === id ? null : id);

  const sections = [
    {
      id: 'origin', label: 'Origin & Weaving Region',
      body: (
        <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.8 }}>
          <p><strong style={{ color: T.ink }}>Region: </strong>{p.weaverInfo?.location || 'Odisha Heritage Cluster'}</p>
          <p style={{ marginTop: 8 }}>
            The {p.weave || 'handloom'} weave originates from Odisha's renowned clusters, where artisan traditions
            have been preserved for generations through temple motifs and regional folk art patterns.
          </p>
          <p style={{ marginTop: 12, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.gold }}>
            ✓ GI Certified Odisha Handloom Region
          </p>
        </div>
      ),
    },
    {
      id: 'artisan', label: 'The Artisan',
      body: p.weaverInfo ? (
        <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.8 }}>
          <p><strong style={{ color: T.ink }}>{p.weaverInfo.name}</strong> · {p.weaverInfo.location}</p>
          {p.weaverInfo.generation && (
            <p style={{ color: T.gold, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '6px 0' }}>
              {p.weaverInfo.generation} Weaving Family
            </p>
          )}
          <p>
            {p.weaverInfo.story ||
              `Hand-guided on a traditional pit loom by ${p.weaverInfo.name}, preserving the heritage of ${p.weaverInfo.location}.`}
          </p>
          <Link
            to={`/weavers/${encodeURIComponent(p.weaverInfo.name)}`}
            style={{ display: 'inline-block', marginTop: 10, fontSize: 11, color: T.red, letterSpacing: '0.06em' }}
          >
            Meet the Weaver →
          </Link>
        </div>
      ) : (
        <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.8 }}>
          Crafted by a verified master weaver from Odisha's renowned handloom cluster, following techniques perfected across generations.
        </p>
      ),
    },
    {
      id: 'craft', label: 'Craft Process',
      body: (
        <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.8 }}>
          <p><strong style={{ color: T.ink }}>Technique: </strong>{p.weave}</p>
          <p style={{ marginTop: 8 }}>
            Every warp and weft is hand-knotted on traditional pit looms. From raw yarn preparation to intricate
            patterns, this takes weeks of dedication — ensuring no two sarees are identical.
          </p>
        </div>
      ),
    },
    {
      id: 'care', label: 'Care Guide',
      body: (
        <div>
          {CARE.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
              <Check size={11} style={{ color: T.gold, flexShrink: 0, marginTop: 4 }} />
              <span style={{ fontSize: 13, color: T.muted, lineHeight: 1.7 }}>{tip}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'returns', label: 'Authenticity & Returns',
      body: (
        <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.8 }}>
          <p>Every piece is a genuine hand-spun, hand-woven Odisha masterpiece sourced directly from artisan families at fair wages.</p>
          <p style={{ marginTop: 8 }}>
            <strong style={{ color: T.ink }}>7-Day Returns: </strong>
            Accepted on untouched sarees with original tags and weaver seals intact. Return in original packaging.
          </p>
          <div style={{ marginTop: 12, padding: '8px 12px', border: `1px solid ${T.border}`, fontSize: 11, letterSpacing: '0.08em', color: T.gold }}>
            TANVO CERTIFICATION — Every piece verified before dispatch.
          </div>
        </div>
      ),
    },
  ];

  return (
    <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 24, marginTop: 8 }}>
      <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.gold, marginBottom: 16 }}>
        The TANVO Story
      </p>
      {sections.map(({ id, label, body }) => (
        <div key={id} style={{ borderBottom: `1px solid ${T.border}` }}>
          <button
            onClick={() => tog(id)}
            style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Playfair Display, serif', fontSize: 14, color: T.ink, textAlign: 'left' }}
          >
            <span>{label}</span>
            <motion.span animate={{ rotate: open === id ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={13} style={{ color: T.gold }} />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingBottom: 18 }}>{body}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
