# Setting Up Real-Time Google Sheets Database (1-Minute Guide)

You can automatically store every participant's study results directly into a **Google Sheet** in real-time without installing any server or database tools.

---

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Name it **"Math Music User Study Results"**.
3. In Row 1, add these column headers:

| A | B | C | D | E | F | G | H | I | J | K | L | M | N |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Timestamp** | **Participant ID** | **Group** | **WMC Score** | **BFI Score** | **AMAS Score** | **Test 1 Condition** | **Test 1 Time** | **Test 1 Mistakes** | **Test 1 Mental Effort** | **Test 2 Condition** | **Test 2 Time** | **Test 2 Mistakes** | **Test 2 Mental Effort** |

---

## Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**.
2. Delete any code in `Code.gs` and paste the following script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    // 1. Try parsing JSON body
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {}
    }
    
    // 2. Fallback to URL parameters
    if (!data || !data.participantId) {
      if (e && e.parameter && Object.keys(e.parameter).length > 0) {
        data = e.parameter;
      }
    }
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.participantId || "",
      data.group || "",
      data.pretest_corsi || "",
      data.pretest_bfi || "",
      data.pretest_amas || "",
      data.test1_condition || "",
      data.test1_time || "",
      data.test1_mistakes || "0",
      data.test1_mental_effort || "",
      data.test2_condition || "",
      data.test2_time || "",
      data.test2_mistakes || "0",
      data.test2_mental_effort || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({result: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾 icon).

---

## Step 3: Deploy as Web App & Authorize

1. Click **Deploy** → **New deployment**.
2. Click the gear icon (⚙️) next to *Select type* and choose **Web app**.
3. Fill in:
   - **Description**: `User Study Webhook`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Crucial so participants can submit without logging into Google)*
4. Click **Deploy**.
5. Click **Authorize access** when prompted.

### ⚠️ How to bypass the "Google hasn't verified this app" screen:
This warning appears because it is your personal Google Apps Script. Follow these 3 simple clicks:
1. On the *"Google hasn't verified this app"* popup screen, click **"Advanced"** (or *"Erweitert"* at the bottom-left).
2. Click the link at the bottom that says **"Go to Untitled project (unsafe)"** (or *"Weiter zu Untitled project (unsicher)"*).
3. Click **"Allow"** (or *"Zulassen"*).

6. Copy the generated **Web App URL** (ends in `/exec`).

---

## Step 4: Paste URL into `summary.html`
In `summary.html` line 225, update:
```js
const GOOGLE_SHEET_WEBHOOK_URL = "YOUR_COPIED_WEBAPP_URL_HERE";
```
