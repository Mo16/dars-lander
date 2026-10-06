/**
 * The cold letter to institutes that have never heard of Dars.
 *
 * DRESSED LIKE AN ACCOUNT EMAIL, WRITTEN LIKE A LETTER. Every other email in
 * the set is a designed sheet: cream page, coloured hero, pill button, the
 * WhatsApp and donation block. To someone on our list that reads as Dars. To
 * a madrasah principal who has never heard of us it reads as a newsletter,
 * and Gmail agrees: a branded layout with a coloured button and a paypal.me
 * link is exactly what the Promotions tab is trained on. The brief for this
 * one is that it lands in the main inbox and still looks like it came from a
 * real organisation, so it borrows the shape of the emails people trust most,
 * the ones Google and Apple send about an account:
 *
 *   · The mark and the name, small, top left, and nothing else in the header.
 *     One 28px image is the only image in the email.
 *   · The letter on one white sheet with a quiet warm edge, on a page barely a
 *     step off white. No fills, no button, no hero. The words are the design.
 *   · One link in the body. The ask is a reply, which is also what teaches
 *     Gmail to put the next one in Primary.
 *   · The small print outside the sheet, in grey, where people expect it.
 *
 * No <style> block and no <title>. renderEmail derives the plain-text part by
 * stripping tags, so either would leave CSS or a stray title at the top of
 * the text version. That also means no dm-* dark-mode overrides: the colours
 * are set inline and the page declares itself light, which is what the
 * account emails this imitates do too.
 *
 * No name tag in the greeting. These recipients are on a hand-pasted list, so
 * {{first_name}} has no account to come from and would render as a blank.
 *
 * It is still marketing under the law, so it carries an unsubscribe in the
 * footer. The sender adds the List-Unsubscribe header too.
 */

export type InstituteOutreachEmailOptions = {
  /** The one-click unsubscribe. The sender passes `{{unsubscribe_url}}`. */
  unsubscribeUrl?: string;
};

export function buildInstituteOutreachEmail(options: InstituteOutreachEmailOptions = {}) {
  const href = "https://darsapp.com/institutes";
  const unsubscribeUrl = options.unsubscribeUrl ?? "https://darsapp.com/email/preferences";

  // A page one step off white so the sheet reads as a sheet, and an edge in
  // the same warm family rather than the UI-kit grey.
  const page = "#F8F6F2";
  const sheet = "#FFFFFF";
  const edge = "#E7E2D9";
  const ink = "#1F1D1A";
  const inkMuted = "#6E6A5F";
  // The deepened brand coral: 6.4:1 on white, so a link that reads as Dars
  // and still clears AA. coral-500 is 3.3:1 and would not.
  const coral = "#A93824";

  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const p = `margin:0 0 16px; font-family:${font}; font-size:15px; line-height:1.6; color:${ink};`;
  const li = `margin:0 0 8px; font-family:${font}; font-size:15px; line-height:1.6; color:${ink};`;
  const small = `margin:0; font-family:${font}; font-size:12px; line-height:1.6; color:${inkMuted};`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
</head>
<body style="margin:0; padding:0; background:${page};">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${page}" style="background:${page};">
  <tr>
    <td align="center" style="padding:32px 16px 40px;">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px; width:100%;">

        <!-- the mark and the name, and nothing else -->
        <tr>
          <td style="padding:0 2px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
              <tr>
                <td valign="middle" style="padding:0 10px 0 0;">
                  <img src="https://darsapp.com/assets/img/logo.png" width="28" height="28" alt="Dars" style="display:block; width:28px; height:28px; border:0; outline:none; text-decoration:none;" />
                </td>
                <td valign="middle" style="font-family:${font}; font-size:18px; line-height:28px; font-weight:600; letter-spacing:-0.01em; color:${ink};">Dars</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- the letter -->
        <tr>
          <td bgcolor="${sheet}" style="background:${sheet}; border:1px solid ${edge}; border-radius:10px; padding:36px 32px 32px;">
            <p style="${p}">Assalāmu ʿalaykum,</p>

            <p style="${p}">I hope you and everyone at your institute are well.</p>

            <p style="${p}">Dars is a revision platform for students of the Islamic sciences. Having studied Alimiyyah myself, I appreciate how much care goes into running an institute, both in the classroom and behind the scenes.</p>

            <p style="${p}">We’re now building Dars for Institutes, a learning platform that helps teachers follow each student’s progress, in class and between lessons. Before we go much further, I’d really value your view. It brings together:</p>

            <ul style="margin:0 0 16px; padding:0 0 0 22px;">
              <li style="${li}">Hifz, Qaidah and Tajweed progress, with sabaq, sabqi and manzil, mistakes and teacher feedback recorded for each student</li>
              <li style="${li}">Revision cards and quizzes linked to the books your students are studying</li>
              <li style="${li}">Azkar and ma‘mulat tracking, so students keep up their daily practice</li>
              <li style="${li}">Homework and reading set by teachers, with a clear view of who is keeping up and who needs support</li>
            </ul>

            <p style="${p}">The everyday admin comes built in as well: enrolment, attendance registers and fee tracking, all in one place.</p>

            <p style="${p}">It’s meant to suit anything from a full-time Alimiyyah programme to an evening maktab or a weekly halaqah.</p>

            <p style="${p}">May I ask: how do your teachers keep track of each student’s progress at the moment? Even a one-line reply would help shape what we build first.</p>

            <p style="${p}">If you’d like early access, you can register interest at <a href="${href}" style="color:${coral}; text-decoration:underline;">darsapp.com/institutes</a></p>

            <p style="margin:0 0 24px; font-family:${font}; font-size:15px; line-height:1.6; color:${ink};">Jazākumullāhu khayran for the work you do for the community.</p>

            <p style="margin:0; font-family:${font}; font-size:15px; line-height:1.5; font-weight:600; color:${ink};">Mohammed Choudhury</p>
            <p style="margin:0; font-family:${font}; font-size:14px; line-height:1.5; color:${inkMuted};">Founder, Dars</p>
          </td>
        </tr>

        <!-- the small print, outside the sheet -->
        <tr>
          <td style="padding:20px 2px 0;">
            <p style="${small}">You’re receiving this because we think Dars could help your institute. If you’d rather I didn’t write again, you can <a href="${unsubscribeUrl}" style="color:${inkMuted}; text-decoration:underline;">unsubscribe</a>.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
