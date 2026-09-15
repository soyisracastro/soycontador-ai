/**
 * Alta en Sendy desde el servidor (la API key nunca viaja al navegador).
 * Port del patrón probado en todoconta-apps/apps/landing, sin la capa CRM.
 * Sendy manda su correo de confirmación: nadie entra a la lista sin confirmar
 * (doble opt-in), y al confirmar aterriza en /dentro.
 */

import {
  SENDY_API_KEY,
  SENDY_ACTION_URL,
  SENDY_EBOOK_LIST_ID,
  SENDY_FLUJOS_LIST_ID,
  SENDY_LIST_ID,
  SENDY_LIVE_LIST_ID,
  SENDY_RECIBOS_LIST_ID,
} from "astro:env/server";

/**
 * `invalido` separa "Sendy rechazó la dirección" de "algo se cayó". Importa
 * porque son fallos distintos: el segundo se resuelve reintentando y el primero
 * no, así que mandarlos por el mismo camino hacía que el formulario respondiera
 * "inténtalo de nuevo" a un fallo determinista.
 */
export type EstadoSendy = "confirm" | "already" | "invalido" | "error";

/**
 * Una lista por promesa. Es deliberado: los autoresponders de Sendy se cuelgan
 * de la lista, no del origen, así que dos promesas en la misma lista obligan a
 * un correo de bienvenida que le queda a medias a las dos.
 *
 *   general → la guía de 5 prompts (home) y los leads que marcan la casilla
 *   live    → el aviso del Jueves de ContadorIA (/jueves)
 *   ebook   → la muestra del libro (/ebook)
 *   flujos  → la guía de los 3 flujos híbridos (/flujos)
 *   recibos → el video de la sesión XML→PDF y su prompt (/recibos)
 *
 * Si una lista no está configurada, el alta cae en la general en lugar de
 * fallar: preferimos un suscriptor en la lista equivocada que un correo
 * perdido. Eso sí, ahí recibiría la bienvenida que no le toca, así que la
 * variable de entorno no es opcional en la práctica.
 */
export type Lista = "general" | "live" | "ebook" | "flujos" | "recibos";

function idDeLista(lista: Lista): string | undefined {
  if (lista === "ebook") return SENDY_EBOOK_LIST_ID || SENDY_LIST_ID;
  if (lista === "live") return SENDY_LIVE_LIST_ID || SENDY_LIST_ID;
  if (lista === "flujos") return SENDY_FLUJOS_LIST_ID || SENDY_LIST_ID;
  if (lista === "recibos") return SENDY_RECIBOS_LIST_ID || SENDY_LIST_ID;
  return SENDY_LIST_ID;
}

export interface SuscribirInput {
  email: string;
  nombre?: string;
  /** Sendy rechaza el alta si no es URL válida: solo se manda cuando parsea */
  referrer?: string;
  /** A qué lista entra. Por omisión, la general. */
  lista?: Lista;
  /**
   * Campos personalizados de la lista de Sendy (el nombre del campo tal cual
   * está en Sendy, ej. Whatsapp/Rol/Interes/Mensaje). Los usa el formulario
   * de calificación de leads.
   */
  campos?: Record<string, string>;
}

export async function suscribir(input: SuscribirInput): Promise<EstadoSendy> {
  const list = idDeLista(input.lista ?? "general");
  if (!SENDY_API_KEY || !SENDY_ACTION_URL || !list) {
    console.error("[sendy] SENDY_API_KEY/ACTION_URL/LIST_ID sin configurar");
    return "error";
  }

  try {
    const body = new URLSearchParams({
      api_key: SENDY_API_KEY,
      email: input.email,
      list,
      boolean: "true",
    });
    if (input.nombre) body.set("name", input.nombre);
    if (input.referrer && URL.canParse?.(input.referrer)) {
      body.set("referrer", input.referrer);
    }
    for (const [campo, valor] of Object.entries(input.campos ?? {})) {
      if (valor) body.set(campo, valor.slice(0, 500));
    }

    const resp = await fetch(SENDY_ACTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(8000),
    });
    const texto = (await resp.text()).trim();
    if (texto === "1" || texto === "true") return "confirm";
    if (texto === "Already subscribed.") return "already";
    if (/invalid email/i.test(texto)) return "invalido";
    console.warn("[sendy] respondió: %s", texto.slice(0, 120));
    return "error";
  } catch (err) {
    console.error("[sendy] no respondió:", err);
    return "error";
  }
}
