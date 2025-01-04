const imaps = require("imap-simple");
require("dotenv").config(); // Đọc biến môi trường từ .env

async function getCodeFromEmail() {
  const config = {
    imap: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASS,
      host: "imap.gmail.com", // Thay đổi nếu không dùng Gmail
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 5000,
    },
  };

  const connection = await imaps.connect(config);

  await connection.openBox("INBOX");

  const searchCriteria = ["UNSEEN", ["SUBJECT", "abc"]]; // get email chưa đọc với subject chứa abc

  // Các tùy chọn để lấy thông tin email
  const fetchOptions = {
    bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)", "TEXT"], // Lấy tiêu đề và nội dung email
    // markSeen: true, // Đánh dấu email là đã đọc sau khi tải xuống
  };

  // Tìm các email chưa đọc và có tiêu đề là "abc"
  try {
    const messages = await connection.search(searchCriteria, fetchOptions);

    if (messages.length === 0) {
      await connection.end();
      console.log("Không có email mới.");
      return 0;
    }
    const message = messages[messages.length - 1]; // lấy email gần nhất
    const text = message.parts.find((part) => part.which === "TEXT")
      ? message.parts.find((part) => part.which === "TEXT").body
      : "";

    // Biểu thức chính quy để tìm mã 6 chữ số trong nội dung
    const codeRegex = /\b\d{6}\b/;

    // Tìm mã 6 chữ số
    const codeMatch = text.match(codeRegex);

    await connection.end();
    if (codeMatch) {
      console.log("code", codeMatch[0]);

      return codeMatch[0];
    }
  } catch (error) {
    console.log(error);
  }
  return 0;
}

module.exports = getCodeFromEmail;
