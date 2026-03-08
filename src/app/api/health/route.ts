import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const status = {
    app: 'healthy',
    database: 'unknown',
    timestamp: new Date().toISOString(),
    version: '0.1.0'
  };

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy'
    );
    
    // Test DB connection with a lightweight query
    const { error } = await supabase.from('users').select('id').limit(1);
    
    if (error) {
      status.database = 'unhealthy';
      console.error('Healthcheck DB Error:', error);
    } else {
      status.database = 'healthy';
    }

  } catch (error) {
    status.database = 'unhealthy';
    console.error('Healthcheck Fatal Error:', error);
  }

  const isHealthy = status.app === 'healthy' && status.database === 'healthy';
  
  return NextResponse.json(status, { 
    status: isHealthy ? 200 : 503 
  });
}
