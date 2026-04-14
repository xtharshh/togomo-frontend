export type TogomoRole = 'customer' | 'restaurant_owner' | 'staff' | 'delivery_agent' | 'admin';

export type TogomoAuthUser = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
};

export type TogomoSession = {
  token: string;
  user: TogomoAuthUser;
};

export type TogomoRegisterInput = {
  username: string;
  password: string;
  email?: string;
  phone_number?: string;
  role?: TogomoRole;
};

export type TogomoMe = {
  user: TogomoAuthUser;
  role: TogomoRole | null;
  phone_number: string;
  referral_code: string;
  loyalty_points: number;
};

const fallbackBaseUrl = 'https://togomo-backend.vercel.app';
const requestTimeoutMs = 12000;

export function getTogomoApiBaseUrl() {
  const envUrl = process.env.EXPO_PUBLIC_TOGOMO_API_URL?.trim();
  return envUrl && envUrl.length > 0 ? envUrl : fallbackBaseUrl;
}

async function fetchWithTimeout(input: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), requestTimeoutMs);
  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `Request failed with ${response.status}`;
    try {
      const body = (await response.json()) as { detail?: string };
      if (body?.detail) {
        message = body.detail;
      }
    } catch {
      // Keep fallback message when no JSON body is available.
    }
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export async function loginWithPassword(username: string, password: string): Promise<TogomoSession> {
  const baseUrl = getTogomoApiBaseUrl();
  let response: Response;
  try {
    response = await fetchWithTimeout(`${baseUrl}/api/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  } catch {
    throw new Error(`Could not reach ${baseUrl}. Verify backend URL and network.`);
  }
  return readJson<TogomoSession>(response);
}

export async function registerWithPassword(input: TogomoRegisterInput): Promise<TogomoSession> {
  const baseUrl = getTogomoApiBaseUrl();
  let response: Response;
  try {
    response = await fetchWithTimeout(`${baseUrl}/api/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch {
    throw new Error(`Could not reach ${baseUrl}. Verify backend URL and network.`);
  }
  return readJson<TogomoSession>(response);
}

export async function fetchMe(token: string): Promise<TogomoMe> {
  const baseUrl = getTogomoApiBaseUrl();
  const response = await fetchWithTimeout(`${baseUrl}/api/auth/me/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return readJson<TogomoMe>(response);
}

export async function logoutWithToken(token: string): Promise<void> {
  const baseUrl = getTogomoApiBaseUrl();
  const response = await fetchWithTimeout(`${baseUrl}/api/auth/logout/`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok && response.status !== 204) {
    throw new Error(`Logout failed with ${response.status}`);
  }
}
