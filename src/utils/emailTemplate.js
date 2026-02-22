
import mjml2html from 'mjml';

export const getContactEmailTemplate = ({ firstName, lastName, email, phone, message }) => {
  const mjmlTemplate = `
    <mjml>
      <mj-head>
        <mj-title>New Message from Your Portfolio</mj-title>
        <mj-preview>New message from ${firstName} ${lastName}</mj-preview>
        <mj-attributes>
          <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-all>
          <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-text>
        </mj-attributes>
        <mj-style inline="inline">
          .body-section { -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15); }
        </mj-style>
        <mj-style inline="inline">
          .text-link { color: #5e6ebf }
        </mj-style>
        <mj-style inline="inline">
          .footer-link { color: #888888 }
        </mj-style>
      </mj-head>
      <mj-body background-color="#E7E7E7" width="600px">
        <mj-section full-width="full-width" background-color="#040B28" padding-bottom="0">
          <mj-column width="100%">
            <mj-text color="#ffffff" font-weight="bold" align="center" text-transform="uppercase" font-size="18px" letter-spacing="1px" padding-top="30px">
              Portfolio Contact
            </mj-text>
            <mj-text color="#17CDF4" align="center" font-size="13px" padding-top="10px" padding-bottom="40px" font-weight="bold" text-transform="uppercase">
              New Inquiry
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section background-color="#F2F2F2">
          <mj-column width="100%">
            <mj-image src="https://brayanalmengordev.netlify.app//logo/logo.png" width="80px" alt="Avatar" padding-bottom="20px" border-radius="50%"></mj-image>
            <mj-text align="center" color="#55575d" font-size="20px" font-family="Arial, sans-serif" padding-bottom="30px" font-weight="bold">
              You Have a New Message
            </mj-text>
            <mj-text align="center" color="#6b6e76" font-size="15px" font-family="Arial, sans-serif" padding-bottom="20px">
              A new email has been received through the <strong>Portfolio Web</strong> digital platform.
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-wrapper padding-top="0" padding-bottom="0" css-class="body-section">
          <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
            <mj-column width="100%">
              <mj-text color="#212b35" font-weight="bold" font-size="20px">
                Sender Details
              </mj-text>
              <mj-table>
                <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
                  <th style="padding: 0 15px 0 0;">Name</th>
                  <td style="padding: 0 15px;">${firstName} ${lastName}</td>
                </tr>
                <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
                  <th style="padding: 0 15px 0 0;">Email</th>
                  <td style="padding: 0 15px;">${email}</td>
                </tr>
                <tr style="border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;">
                  <th style="padding: 0 15px 0 0;">Phone</th>
                  <td style="padding: 0 15px;">${phone || 'Not provided'}</td>
                </tr>
              </mj-table>
              <mj-text color="#212b35" font-weight="bold" font-size="20px" padding-top="20px">
                Message
              </mj-text>
              <mj-text color="#637381" font-size="16px" padding-bottom="30px">
                "${message}"
              </mj-text>
            </mj-column>
          </mj-section>
        </mj-wrapper>
        <mj-section>
          <mj-column width="100%" padding="0">
            <mj-text color="#445566" font-size="11px" align="center" line-height="16px">
              &copy; Brayan Almengor Portfolio. All Rights Reserved.
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;
  return mjmlTemplate;
};
export const compileEmailTemplate = (data) => {
  const mjmlContent = getContactEmailTemplate(data);
  const { html } = mjml2html(mjmlContent);
  return html;
};
