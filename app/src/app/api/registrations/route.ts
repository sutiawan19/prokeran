import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { StatusSearchResult } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const registrations = db.getRegistrations();
    return NextResponse.json(registrations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real app we'd fetch the proker and division to map names, but we pass them from the client for now to keep it simple.
    const newReg: StatusSearchResult = {
      id: `reg-${Date.now()}`,
      full_name: body.full_name,
      phone_masked: body.phone.replace(/.(?=.{4})/g, '*'),
      proker_title: body.proker_title || 'Unknown Proker',
      division_name: body.division_name || 'Unknown Division',
      status: 'pending',
      registered_at: new Date().toISOString(),
      proker_status: 'ongoing',
      nim: body.nim,
      phone: body.phone,
      motivation: body.motivation,
      experience: body.organization_experience,
    };

    db.addRegistration(newReg);
    return NextResponse.json(newReg, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    db.updateRegistrationStatus(id, status);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update registration status' }, { status: 500 });
  }
}
