const QRCode = require("qrcode");

async function generateQRCode(data) {
  try {
    const dataUrl = await QRCode.toDataURL(data); // returns base64 data URI
    return dataUrl;
  } catch (err) {
    throw new Error("QR generation failed: " + err.message);
  }
}

module.exports = generateQRCode;
