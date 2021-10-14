'use strict';

module.exports = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>App - Bolivia</title>
</head>
<body style="font: 16px normal Arial, Helvetica, sans-serif; margin: 0; padding: 20px; background-color: #FAF7F9; color: #7e4e6e;">
  <div class="container" style="margin: 0 auto; width: 100%; max-width: 640px; box-shadow: 0 0 20px 0 rgba(62, 28, 131, 0.1); background-color: #ffffff; border-radius: 3px;">
    <div class="header" style="padding: 15px 20px; border-bottom: 1px solid #f5f5f5; text-align: center; color: #7e4e6e; border-top: 2px solid #7e4e6e;">
      <h1 style="font-size: 20px; margin: 0;">App</h1>
    </div>
    <div class="main" style="padding: 15px 20px;">
      <div>
        {mensaje}
      </div>
      <p style="margin: 50px 0 0; font-size: 12px; color: #999999; letter-spacing: 1px;">No responda a este correo electrónico</p>
    </div>
    <div class="footer" style="background-color: #7e4e6e; color: white; text-align: center; padding: 8px 10px;">
      <small style="letter-spacing: 2px; font-size: 10px;">App {year}</small>
    </div>
  </div>
</body>
</html>
`;
