<h1>Step by step</h1>

Step 1: Turn on IMAP in your gmail<br>
Step 2: Setting App password of your account, link: https://myaccount.google.com/u/2/apppasswords<br>
Step 3: Create file .env similar to file .env-local<br>
Step 4: Get your App password that is created at Step 2 and copy to <b>EMAIL_PASS</b> in file .env<br>
Step 5: Change value <b>EMAIL_USER</b> by your email<br>
Step 6: Run <b>npm i</b> at your terminal to instal library in package.json<br>
Step 7: Open other your email and send email to the email(you're setting) with subject "abc" and body contains code has 6 digits<br>
Step 8: Run <b>npm test</b> to test the code that you receive from the email
