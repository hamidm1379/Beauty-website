const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID ?? "";
const ZARINPAL_SANDBOX = process.env.ZARINPAL_SANDBOX === "true";

const SANDBOX_BASE = "https://sandbox.zarinpal.com";
const PROD_BASE = "https://payment.zarinpal.com";

const base = ZARINPAL_SANDBOX ? SANDBOX_BASE : PROD_BASE;

interface ZarinpalRequestResponse {
  data: {
    code: number;
    message: string;
    authority: string;
    fee_type: string;
    fee: number;
  };
  errors: string[];
}

interface ZarinpalVerifyResponse {
  data: {
    code: number;
    message: string;
    card_hash: string;
    card_pan: string;
    ref_id: number;
    fee_type: string;
    fee: number;
  };
  errors: string[];
}

export async function requestPayment(params: {
  amount: number;
  description: string;
  callbackUrl: string;
  email?: string;
  mobile?: string;
}): Promise<{ authority: string; gatewayUrl: string }> {
  const body: Record<string, unknown> = {
    merchant_id: ZARINPAL_MERCHANT_ID,
    amount: params.amount,
    callback_url: params.callbackUrl,
    description: params.description,
  };

  const metadata: Record<string, string> = {};
  if (params.mobile) metadata.mobile = params.mobile;
  if (params.email) metadata.email = params.email;
  if (Object.keys(metadata).length > 0) {
    body.metadata = metadata;
  }

  const res = await fetch(`${base}/pg/v4/payment/request.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: ZarinpalRequestResponse = await res.json();

  if (data.data?.code !== 100 || !data.data?.authority) {
    throw new Error(
      `خطا در ارتباط با درگاه پرداخت: ${data.data?.message ?? JSON.stringify(data.errors) ?? "unknown"}`,
    );
  }

  return {
    authority: data.data.authority,
    gatewayUrl: `${base}/pg/StartPay/${data.data.authority}`,
  };
}

export async function verifyPayment(params: {
  amount: number;
  authority: string;
}): Promise<{ refId: number; success: boolean }> {
  const body = {
    merchant_id: ZARINPAL_MERCHANT_ID,
    amount: params.amount,
    authority: params.authority,
  };

  const res = await fetch(`${base}/pg/v4/payment/verify.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data: ZarinpalVerifyResponse = await res.json();

  return {
    refId: data.data?.ref_id,
    success: data.data?.code === 100 || data.data?.code === 101,
  };
}
