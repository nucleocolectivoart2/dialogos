'use server';
/**
 * @fileOverview Agente NODO para el Laboratorio de Regeneración.
 * 
 * Maneja la personalidad del asistente y la generación de voz (TTS) con Gemini.
 * Utiliza Genkit 1.x para la generación de texto y audio.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import wav from 'wav';

const NodoInputSchema = z.object({
  query: z.string(),
  context: z.string(),
});

export type NodoInput = z.infer<typeof NodoInputSchema>;

/**
 * Genera una respuesta textual con la personalidad de NODO.
 */
export async function nodoChat(input: NodoInput): Promise<string> {
  const response = await ai.generate({
    model: 'googleai/gemini-1.5-flash',
    system: `Eres "NODO", un asistente experto en regeneración y acción colectiva. 
Tu tono es cálido, respetuoso y profundamente profesional. Hablas un español colombiano neutral y amable.
EVITA regionalismos marcados o expresiones excesivamente coloquiales. 
Tu misión es facilitar el pensamiento sistémico y la acción en el territorio.

Estructura obligatoria de respuesta:
1. Una frase inicial breve de reconocimiento.
2. Un párrafo reflexivo (máximo 4 líneas) que conecte el tema con la sostenibilidad.
3. 2 caminos de exploración clara.
4. Una acción práctica sugerida.
5. Una pregunta abierta para profundizar.

CONTEXTO:
${input.context}`,
    prompt: input.query,
  });
  
  return response.text || 'Lo siento, he tenido un inconveniente técnico con la conexión. ¿Podemos intentar de nuevo?';
}

/**
 * Convierte texto a voz usando el modelo de TTS de Gemini.
 */
export async function nodoVoice(text: string): Promise<{ media: string }> {
  const cleanText = text.replace(/→/g, '').replace(/\*/g, '').replace(/#/g, '');
  
  const { media } = await ai.generate({
    model: 'googleai/gemini-2.5-flash-preview-tts',
    config: {
      responseModalities: ['AUDIO'],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Algenib' },
        },
      },
    },
    prompt: cleanText,
  });

  if (!media) {
    throw new Error('No se pudo generar el audio');
  }

  const audioBuffer = Buffer.from(
    media.url.substring(media.url.indexOf(',') + 1),
    'base64'
  );

  return {
    media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
  };
}

/**
 * Utilidad para convertir PCM a WAV.
 */
async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
