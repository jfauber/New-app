import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: `You are a lease analysis assistant. Read this lease and determine whether the tenant is allowed to sublet their apartment. Return ONLY a valid JSON object with three fields: "verdict" (must be exactly one of: "allowed", "not_allowed", or "unclear"), "explanation" (a 2-3 sentence plain English summary of what the lease says about subletting), and "relevant_clause" (the exact clause from the lease that covers subletting, if found — empty string if not found). Do not include any text outside the JSON object.`,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: base64,
              },
            },
            {
              type: 'text',
              text: 'Please analyze this lease document and determine whether subletting is allowed. Return the result as a JSON object.',
            },
          ],
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not parse AI response')
    }

    const result = JSON.parse(jsonMatch[0])

    if (!['allowed', 'not_allowed', 'unclear'].includes(result.verdict)) {
      throw new Error('Invalid verdict from AI')
    }

    return NextResponse.json(result)
  } catch (err: unknown) {
    console.error('Lease analysis error:', err)
    const message = err instanceof Error ? err.message : 'Analysis failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
