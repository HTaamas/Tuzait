import type { APIRoute } from 'astro';
import prisma from '../../lib/prisma.ts';

export const GET: APIRoute = async () => {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}