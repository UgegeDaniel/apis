"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailVerificationText = exports.escapeSingleQuotes = void 0;
/* eslint-disable linebreak-style */
const appLink = process.env.FRONTEND_APP_URL;
function escapeSingleQuotes(str) {
    return str.replace(/'/g, "''");
}
exports.escapeSingleQuotes = escapeSingleQuotes;
const emailVerificationText = (ref, username) => `
<div style="padding: 20px; background-color: rgb(255, 255, 255);">
  <div style="color: rgb(0, 0, 0); text-align: left;">
    <h1 style="margin: 1rem 0">Hello, ${username} 😊...</h1>
    <p style="padding-bottom: 16px">
      Thank you for signing up to Jakk, click the link to verify your account.
    </p>
    <p style="padding-bottom: 16px">
      <a href="${appLink}verifyEmail/${ref}" target="_blank" 
      style="padding: 12px 24px; border-radius: 4px; color: #FFF; 
      background: #2B52F5;display: inline-block;margin: 0.5rem 0; 
      text-decoration: none;">
        Verify My Account
      </a>
    </p>
    <p style="padding-bottom: 16px">
     If you didn’t ask to verify this address, you can ignore this email.
    </p>
    <p style="padding-bottom: 16px">Thanks,<br>Ugege Daniel O.</p>
  </div>
</div>
`;
exports.emailVerificationText = emailVerificationText;
