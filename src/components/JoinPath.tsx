import styles from "./Band.module.css";

/* Fig. 04 — what one tap asks of Gathr's backend.

   Traced from ParticipationService.joinActivity in the gathrly repository:
   the idempotency key is acquired or looked up; the activity row is locked;
   seven guards run in this order inside the transaction; the participation
   is created or a cancelled one reactivated; the key is marked complete
   with the participation id and the activity's status re-synced; the
   commit releases the lock; only then do reminders and notifications go out
   and the group's chat topic hears about it. Static, server-rendered SVG;
   the packet's ride is CSS. */

const NODES = [
  { id: "tap", label: "Join", detail: "POST /activities/{id}/join", actor: "person" },
  { id: "key", label: "Idempotency-Key", detail: "acquire · or look up", actor: "system" },
  { id: "lock", label: "Lock activity", detail: "SELECT … FOR UPDATE", actor: "system" },
  { id: "guards", label: "Guards", detail: "seven, in order", actor: "system" },
  { id: "write", label: "Participation", detail: "create · or reactivate", actor: "system" },
  { id: "commit", label: "Commit", detail: "lock released", actor: "system" },
  { id: "group", label: "The group sees it", detail: "/topic/chat/{id}", actor: "group" },
] as const;

const GUARDS = [
  "already_joined",
  "not_open",
  "activity_ended",
  "activity_started",
  "reliability_too_low",
  "not_crew_member",
  "full",
];

const W = 560;
const STEP = 92;
const NODE_Y = 40;
const NODE_W = 82;
const NODE_H = 40;

export function JoinPath() {
  const nodes = NODES.map((node, i) => ({ ...node, x: 8 + i * STEP, y: NODE_Y }));
  const spine = nodes
    .map((n, i) => `${i === 0 ? "M" : "L"}${n.x + (i === 0 ? NODE_W : 0)} ${n.y + NODE_H / 2}`)
    .join(" ");
  const guards = nodes[3];

  return (
    <svg
      className={styles.joinPath}
      viewBox={`0 0 ${W + 96} 250`}
      role="img"
      aria-label="The join path: tap, idempotency key, locked activity row, seven guards in order, participation write, commit, then the group's chat topic."
      style={{ ["--spine" as string]: `path("${spine}")` }}
    >
      {/* the transaction boundary: key through commit */}
      <rect className={styles.joinTx} x={nodes[1].x - 8} y={NODE_Y - 12} width={nodes[5].x + NODE_W - nodes[1].x + 16} height={NODE_H + 24} rx="2" />
      <text className={styles.joinBand} x={nodes[1].x - 8} y={NODE_Y - 18}>one locked transaction</text>
      <text className={styles.joinBand} x={nodes[0].x} y={NODE_Y - 18}>person</text>
      <text className={styles.joinBand} x={nodes[6].x} y={NODE_Y - 18}>group</text>

      <path className={styles.joinSpine} d={spine} />
      <path className={styles.joinActive} d={spine} pathLength={1} />

      {nodes.map((n, i) => (
        <g key={n.id} className={styles.joinNode} data-actor={n.actor}>
          <rect x={n.x} y={n.y} width={NODE_W} height={NODE_H} rx={n.actor === "system" ? 2 : 20} />
          <text className={styles.joinIndex} x={n.x + 8} y={n.y + 12}>{String(i + 1).padStart(2, "0")}</text>
          <text className={styles.joinLabel} x={n.x + 8} y={n.y + 25}>{n.label}</text>
          <text className={styles.joinDetail} x={n.x + 8} y={n.y + 35}>{n.detail}</text>
        </g>
      ))}

      {/* the guards, hung off their node, in the order the code runs them */}
      <g className={styles.joinGuards} transform={`translate(${guards.x} ${NODE_Y + NODE_H + 22})`}>
        <text className={styles.joinBand} x="0" y="0">in order</text>
        <line x1="0" x2={NODE_W} y1="5" y2="5" />
        {GUARDS.map((guard, i) => (
          <g key={guard} transform={`translate(0 ${18 + i * 13})`}>
            <rect x="0" y="-6" width="4" height="4" />
            <text x="9" y="0">{guard}</text>
          </g>
        ))}
      </g>

      {/* after the commit, asynchronously */}
      <g className={styles.joinGuards} transform={`translate(${nodes[5].x} ${NODE_Y + NODE_H + 22})`}>
        <text className={styles.joinBand} x="0" y="0">after commit</text>
        <line x1="0" x2={NODE_W} y1="5" y2="5" />
        {["reminders 1h · 15m", "notify participants", "calendar sync"].map((item, i) => (
          <g key={item} transform={`translate(0 ${18 + i * 13})`}>
            <rect x="0" y="-6" width="4" height="4" />
            <text x="9" y="0">{item}</text>
          </g>
        ))}
      </g>

      {/* the outcomes of the key */}
      <g className={styles.joinGuards} transform={`translate(${nodes[1].x} ${NODE_Y + NODE_H + 22})`}>
        <text className={styles.joinBand} x="0" y="0">outcome</text>
        <line x1="0" x2={NODE_W} y1="5" y2="5" />
        {["PROCEED", "REPLAY", "IN_FLIGHT", "MISMATCH"].map((item, i) => (
          <g key={item} transform={`translate(0 ${18 + i * 13})`} data-on={i === 0 ? "true" : undefined}>
            <rect x="0" y="-6" width="4" height="4" />
            <text x="9" y="0">{item}</text>
          </g>
        ))}
      </g>

      {/* the packet: a request riding the path, again and again, slowly */}
      <circle className={styles.joinPacket} r="3.5" />
    </svg>
  );
}
