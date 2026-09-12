/** Shared by the server page and the client stage, so it must not live in a
    "use client" module — the server would only see a client reference. */
export const exposures = ["The edge", "A voice", "Possibility", "Connection", "Curiosity", "Openness"] as const;
export const anchors = ["edge", "voice", "possibility", "connection", "curiosity", "openness"] as const;
