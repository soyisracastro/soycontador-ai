/**
 * POST /api/newsletter
 *
 * Alta de newsletter server-side hacia Sendy (doble opt-in). Único endpoint
 * serverless del sitio; todo lo demás es estático.
 *
 * Body JSON: { email, hp?, referrer?, lista? }
 * Respuesta:  { ok, status: 'confirm' | 'already' | 'error', error? }
 *
 * `lista` sirve para que el lead magnet de /ebook entre a su propia lista de
 * Sendy sin duplicar el endpoint. Solo se aceptan los valores conocidos: el
 * navegador nunca decide un ID de lista.
 */

import type { APIRoute } from "astro";

import { suscribir, type EstadoSendy, type Lista } from "../../lib/sendy";

export const prerender = false;

interface NewsletterResponse {
  ok: boolean;
  status?: EstadoSendy;
  error?: string;
}

/** Reintentar no arregla una dirección rechazada: hay que corregirla. */
const AVISO_INVALIDO = "Esa dirección no pasó la validación. Revísala o prueba con otra.";

const json = (status: number, body: NewsletterResponse): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request }) => {
  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "Body inválido (no es JSON)" });
  }

  // Honeypot: 200 fake para bots.
  if (typeof raw.hp === "string" && raw.hp.length > 0) {
    return json(200, { ok: true, status: "confirm" });
  }

  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return json(400, { ok: false, error: "Correo inválido" });
  }
  const referrer = typeof raw.referrer === "string" ? raw.referrer.slice(0, 500) : undefined;
  // Lista blanca: el navegador elige entre nombres conocidos, nunca un ID.
  const LISTAS: Lista[] = ["general", "live", "ebook", "flujos", "recibos"];
  const lista: Lista = LISTAS.find((l) => l === raw.lista) ?? "general";

  const status = await suscribir({ email, referrer, lista });

  if (status === "invalido") {
    return json(400, { ok: false, status, error: AVISO_INVALIDO });
  }
  if (status === "error") {
    return json(502, { ok: false, status, error: "No pudimos suscribirte. Inténtalo de nuevo." });
  }
  return json(200, { ok: true, status });
};

export const ALL: APIRoute = () => json(405, { ok: false, error: "Method not allowed" });
