import crypto from "crypto";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 12;

function getSecret() {
  return process.env.ADMIN_AUTH_SECRET || "portfolio-admin-secret";
}

function getAdminCredentials() {
  return {
    email: process.env.ADMIN_LOGIN_EMAIL,
    password: process.env.ADMIN_LOGIN_PASSWORD,
  };
}

export function validateAdminCredentials(email, password) {
  const admin = getAdminCredentials();
  return email === admin.email && password === admin.password;
}

export function createAdminToken(email) {
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = JSON.stringify({ email, expiresAt });
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  const encodedPayload = Buffer.from(payload).toString("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminToken(token) {
  try {
    const [encodedPayload, signature] = token.split(".");

    if (!encodedPayload || !signature) {
      return null;
    }

    const payload = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const expectedSignature = crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) {
      return null;
    }

    const parsedPayload = JSON.parse(payload);
    const email = parsedPayload?.email;
    const expiresAt = Number(parsedPayload?.expiresAt);

    if (!email || !expiresAt || Date.now() > expiresAt) {
      return null;
    }

    if (email !== process.env.ADMIN_LOGIN_EMAIL) {
      return null;
    }

    return { email, expiresAt };
  } catch {
    return null;
  }
}

export function requireAdminAuth(req, res, next) {
  const authHeader = req.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const session = verifyAdminToken(token);

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Admin authentication required.",
    });
  }

  req.admin = session;
  return next();
}
