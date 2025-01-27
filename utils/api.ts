import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function get(path: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${path}`, options);
  return response.json();
}

export async function post(path: string, data: any, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...options,
  });
  return response.json();
}

export async function put(path: string, data: any, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    ...options,
  });
  return response.json();
}

export async function del(path: string, options?: RequestInit) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    ...options,
  });
  return response.json();
}

export async function handleResponse(promise: Promise<Response>) {
  try {
    const response = await promise;
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }
    return response.json();
  } catch (error) {
    console.error("API error:", error);
    // Enhanced error handling
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
