// Garage Dreaming AI Estimator Worker
// Deploy this as a Cloudflare Worker and set OPENAI_API_KEY as a Worker secret.
// Optional env vars:
//   OPENAI_MODEL=gpt-5.5-mini
//   ALLOWED_ORIGIN=https://your-domain.com

const DEFAULT_MODEL = 'gpt-5.5-mini';

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '*';
  const allowed = env.ALLOWED_ORIGIN || origin;
  return {
    'Access-Control-Allow-Origin': allowed === '*' ? '*' : allowed,
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Content-Type': 'application/json'
  };
}

function json(data, status, request, env) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: corsHeaders(request, env)
  });
}

function buildPrompt(layout) {
  return `You are a practical construction cost estimator for hobby shops, garages, metal buildings, pole barns, and barndominiums.

Use the provided layout JSON to produce a rough planning estimate. Be explicit that this is not a bid. Prefer realistic ranges over false precision.

Estimate these categories when applicable:
- concrete slab and reinforcement
- building shell / structure
- overhead doors
- windows
- insulation / liner package
- electrical rough-in and service considerations
- HVAC / conditioning
- plumbing if bathroom appears
- interior finish / office finish if rooms appear
- contingency

Return ONLY valid JSON in this shape:
{
  "summary": "short plain-English summary",
  "confidence": "Low|Medium|High",
  "currency": "USD",
  "low": 0,
  "high": 0,
  "likely": 0,
  "categories": [
    {"name":"Concrete slab", "low":0, "high":0, "likely":0, "notes":"..."}
  ],
  "layout_observations": ["..."],
  "risks": ["..."],
  "recommendations": ["..."],
  "excluded": ["..."]
}

Layout JSON:
${JSON.stringify(layout, null, 2)}`;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(request, env) });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Use POST with a Garage Dreaming layout payload.' }, 405, request, env);
    }

    if (!env.OPENAI_API_KEY) {
      return json({ error: 'OPENAI_API_KEY is not configured on this Worker.' }, 500, request, env);
    }

    let layout;
    try {
      layout = await request.json();
    } catch (err) {
      return json({ error: 'Invalid JSON payload.' }, 400, request, env);
    }

    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL || DEFAULT_MODEL,
          input: buildPrompt(layout),
          temperature: 0.2
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return json({ error: 'OpenAI request failed.', details: data }, response.status, request, env);
      }

      const text = data.output_text || data.output?.flatMap(o => o.content || []).map(c => c.text || '').join('\n') || '';
      const cleaned = text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();

      try {
        return json(JSON.parse(cleaned), 200, request, env);
      } catch (err) {
        return json({
          error: 'AI returned non-JSON output.',
          raw: text
        }, 502, request, env);
      }
    } catch (err) {
      return json({ error: 'Estimator failed.', details: String(err && err.message ? err.message : err) }, 500, request, env);
    }
  }
};
