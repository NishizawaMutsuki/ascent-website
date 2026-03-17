export default function ShapesShowcase() {
  const cyan = "rgba(56, 189, 248, 0.6)";
  const cyanFill = "rgba(56, 189, 248, 0.12)";
  const cyanGlow = "rgba(56, 189, 248, 0.08)";

  const shapes = [
    {
      name: "大きなリング（円）",
      category: "線系",
      svg: (
        <svg viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="120" fill="none" stroke={cyan} strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "正六角形",
      category: "線系",
      svg: (
        <svg viewBox="0 0 300 300">
          <polygon points="150,30 260,80 260,220 150,270 40,220 40,80" fill="none" stroke={cyan} strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "角丸四角（枠）",
      category: "線系",
      svg: (
        <svg viewBox="0 0 300 300">
          <rect x="50" y="50" width="200" height="200" rx="20" fill="none" stroke={cyan} strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "傾いた菱形",
      category: "線系",
      svg: (
        <svg viewBox="0 0 300 300">
          <rect x="90" y="90" width="120" height="120" fill="none" stroke={cyan} strokeWidth="1.5" transform="rotate(45, 150, 150)" />
        </svg>
      ),
    },
    {
      name: "弧（1/4円）",
      category: "線系",
      svg: (
        <svg viewBox="0 0 300 300">
          <path d="M 50 250 A 200 200 0 0 1 250 50" fill="none" stroke={cyan} strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "同心円",
      category: "線系",
      svg: (
        <svg viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="40" fill="none" stroke={cyan} strokeWidth="1" />
          <circle cx="150" cy="150" r="80" fill="none" stroke={cyan} strokeWidth="1" opacity="0.6" />
          <circle cx="150" cy="150" r="120" fill="none" stroke={cyan} strokeWidth="1" opacity="0.3" />
        </svg>
      ),
    },
    {
      name: "ドットグリッド（整列）",
      category: "ドット系",
      svg: (
        <svg viewBox="0 0 300 300">
          {Array.from({ length: 36 }).map((_, i) => (
            <circle
              key={i}
              cx={75 + (i % 6) * 30}
              cy={75 + Math.floor(i / 6) * 30}
              r="3"
              fill={cyan}
            />
          ))}
        </svg>
      ),
    },
    {
      name: "ドット散布（ランダム）",
      category: "ドット系",
      svg: (
        <svg viewBox="0 0 300 300">
          {[
            [80, 60], [200, 40], [140, 100], [50, 150], [250, 130],
            [100, 200], [220, 190], [170, 250], [60, 260], [280, 240],
            [130, 50], [240, 80], [90, 120], [190, 160], [150, 210],
            [70, 220], [210, 270], [260, 60], [110, 280], [180, 30],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.5 + Math.random() * 2} fill={cyan} opacity={0.3 + Math.random() * 0.5} />
          ))}
        </svg>
      ),
    },
    {
      name: "ネットワーク（接続ドット）",
      category: "ドット系",
      svg: (
        <svg viewBox="0 0 300 300">
          {[
            [80, 80], [200, 60], [150, 150], [60, 200], [240, 180], [120, 260], [260, 260],
          ].map(([x, y], i) => (
            <circle key={`d${i}`} cx={x} cy={y} r="5" fill={cyan} />
          ))}
          <line x1="80" y1="80" x2="200" y2="60" stroke={cyan} strokeWidth="0.8" opacity="0.4" />
          <line x1="80" y1="80" x2="150" y2="150" stroke={cyan} strokeWidth="0.8" opacity="0.4" />
          <line x1="200" y1="60" x2="150" y2="150" stroke={cyan} strokeWidth="0.8" opacity="0.4" />
          <line x1="200" y1="60" x2="240" y2="180" stroke={cyan} strokeWidth="0.8" opacity="0.4" />
          <line x1="150" y1="150" x2="60" y2="200" stroke={cyan} strokeWidth="0.8" opacity="0.4" />
          <line x1="150" y1="150" x2="240" y2="180" stroke={cyan} strokeWidth="0.8" opacity="0.4" />
          <line x1="60" y1="200" x2="120" y2="260" stroke={cyan} strokeWidth="0.8" opacity="0.4" />
          <line x1="240" y1="180" x2="260" y2="260" stroke={cyan} strokeWidth="0.8" opacity="0.4" />
          <line x1="120" y1="260" x2="260" y2="260" stroke={cyan} strokeWidth="0.8" opacity="0.4" />
        </svg>
      ),
    },
    {
      name: "斜め直線（対角）",
      category: "ライン系",
      svg: (
        <svg viewBox="0 0 300 300">
          <line x1="40" y1="260" x2="260" y2="40" stroke={cyan} strokeWidth="1" />
          <line x1="80" y1="280" x2="280" y2="80" stroke={cyan} strokeWidth="0.6" opacity="0.4" />
        </svg>
      ),
    },
    {
      name: "グリッド線（格子）",
      category: "ライン系",
      svg: (
        <svg viewBox="0 0 300 300">
          {[60, 120, 180, 240].map((v, i) => (
            <g key={i}>
              <line x1={v} y1="40" x2={v} y2="260" stroke={cyan} strokeWidth="0.6" opacity="0.3" />
              <line x1="40" y1={v} x2="260" y2={v} stroke={cyan} strokeWidth="0.6" opacity="0.3" />
            </g>
          ))}
        </svg>
      ),
    },
    {
      name: "曲線（ベジェカーブ）",
      category: "ライン系",
      svg: (
        <svg viewBox="0 0 300 300">
          <path d="M 30 250 C 80 50, 220 50, 270 250" fill="none" stroke={cyan} strokeWidth="1.5" />
          <path d="M 30 250 C 120 100, 180 100, 270 250" fill="none" stroke={cyan} strokeWidth="0.8" opacity="0.3" />
        </svg>
      ),
    },
    {
      name: "ぼかした光の玉（グロー）",
      category: "塗り系",
      svg: (
        <svg viewBox="0 0 300 300">
          <defs>
            <radialGradient id="glow1">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="150" r="100" fill="url(#glow1)" />
        </svg>
      ),
    },
    {
      name: "グラデーション三角",
      category: "塗り系",
      svg: (
        <svg viewBox="0 0 300 300">
          <defs>
            <linearGradient id="triGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.15)" />
              <stop offset="100%" stopColor="rgba(129, 140, 248, 0.05)" />
            </linearGradient>
          </defs>
          <polygon points="150,40 270,250 30,250" fill="url(#triGrad)" />
        </svg>
      ),
    },
    {
      name: "小さな塗り丸（散布）",
      category: "塗り系",
      svg: (
        <svg viewBox="0 0 300 300">
          {[
            [80, 80, 6], [200, 60, 4], [140, 150, 8], [60, 220, 5],
            [240, 180, 7], [170, 250, 3], [110, 130, 5], [230, 100, 4],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={cyan} opacity={0.15 + i * 0.05} />
          ))}
        </svg>
      ),
    },
    {
      name: "三日月弧",
      category: "線系",
      svg: (
        <svg viewBox="0 0 300 300">
          <path d="M 80 250 A 150 150 0 0 1 250 100" fill="none" stroke={cyan} strokeWidth="1.5" />
          <path d="M 100 250 A 130 130 0 0 1 240 120" fill="none" stroke={cyan} strokeWidth="0.8" opacity="0.3" />
        </svg>
      ),
    },
    {
      name: "十字（クロスヘア）",
      category: "線系",
      svg: (
        <svg viewBox="0 0 300 300">
          <line x1="150" y1="60" x2="150" y2="240" stroke={cyan} strokeWidth="1" />
          <line x1="60" y1="150" x2="240" y2="150" stroke={cyan} strokeWidth="1" />
          <circle cx="150" cy="150" r="4" fill={cyan} />
        </svg>
      ),
    },
    {
      name: "波線（サインカーブ）",
      category: "ライン系",
      svg: (
        <svg viewBox="0 0 300 300">
          <path d="M 20 150 Q 70 80, 120 150 Q 170 220, 220 150 Q 270 80, 300 150" fill="none" stroke={cyan} strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "破線リング",
      category: "線系",
      svg: (
        <svg viewBox="0 0 300 300">
          <circle cx="150" cy="150" r="110" fill="none" stroke={cyan} strokeWidth="1.5" strokeDasharray="12 8" />
        </svg>
      ),
    },
  ];

  return (
    <main style={{ padding: "2rem 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "Outfit", fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.5rem" }}>
        背景図形カタログ
      </h1>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginBottom: "2rem" }}>
        黒背景に配置する幾何学図形の候補一覧。クリックで拡大はしません。
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {shapes.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#000",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1.5rem", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: 200 }}>{s.svg}</div>
            </div>
            <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.15rem" }}>{s.name}</p>
              <p style={{ fontSize: "0.65rem", color: "var(--color-text-dim)" }}>{s.category}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
