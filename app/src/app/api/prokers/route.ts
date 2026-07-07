import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Proker } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const prokers = db.getProkers();
    return NextResponse.json(prokers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch prokers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newProker: Proker = {
      id: `proker-${Date.now()}`,
      ukm_id: 'ukm-001',
      title: body.title,
      slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: body.description || null,
      banner_url: '/placeholder-banner.jpg',
      start_date: body.start_date || null,
      end_date: body.end_date || null,
      registration_open: body.registration_open || null,
      registration_close: body.registration_close || null,
      status: body.status || 'upcoming',
      documentation: [],
      benefits: body.benefits || null,
      divisions: body.divisions || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.addProker(newProker);
    return NextResponse.json(newProker, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create proker' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    db.updateProker(id, updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update proker' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    db.deleteProker(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete proker' }, { status: 500 });
  }
}
