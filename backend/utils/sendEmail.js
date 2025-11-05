const SibApiV3Sdk = require("@getbrevo/brevo");

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    await apiInstance.sendTransacEmail({
      sender: { email: process.env.BREVO_SENDER_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent,
    });
  } catch (err) {
    // Don't log the API key; only log the message from Brevo
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Unknown Brevo email error";
    console.error("Brevo send error:", msg);
    // Bubble a clear error so your controller returns 500 with context
    throw new Error(`Email send failed: ${msg}`);
  }
};

module.exports = sendEmail;
