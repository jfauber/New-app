import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // In production: save to Supabase waitlist table
    // const { createClient } = await import('@/lib/supabase/server')
    // const supabase = await createClient()
    // await supabase.from('waitlist').insert({ email })

    console.log('Waitlist signup:', email)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Waitlist error:', err)
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 })
  }
}
