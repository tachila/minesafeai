MINESAFE AI AUTHENTICATION UPDATE

Files included:
- App.jsx: restores visible login inputs; Mining ID appears on login only; registration fields remain as requested.
- App.css: fixes input alignment by using the .form-field class names and softens the mining-photo overlay.
- login.js: validates a miner's Mining ID against users/{uid} in Firestore after Firebase email/password authentication.

INSTALL:
1. Back up your existing src/App.jsx, src/App.css and src/login.js.
2. Replace those three files with the matching files in this folder.
3. Keep your existing src/index.css as it is. It imports ./App.css.
4. Keep your existing signup.js and firebase.js as they are.
5. Restart Vite: Ctrl+C, then npm run dev.

IMPORTANT FIRESTORE SETUP:
For each existing miner, the document users/{their Firebase Auth UID} must contain:
{
  role: "miner",
  miningId: "THEIR_OFFICIAL_MINING_ID"
}
The Mining ID comparison ignores upper/lowercase and leading/trailing spaces.
Applicant accounts should have role: "applicant" and do not need miningId.
Do not let users choose their own role or write their own role/miningId from the client.
Restrict role and miningId writes using Firestore Security Rules or an administrator-only process.

LOGIN BEHAVIOUR:
- Applicant: email + password; leave Mining ID blank.
- Miner: email + Mining ID + password.
- If the Mining ID does not match the signed-in account, the Firebase session is signed out and access is denied.

NOTE:
This version preserves the existing Quiz and dashboard component imports/props.
