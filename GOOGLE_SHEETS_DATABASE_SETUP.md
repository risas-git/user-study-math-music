# Setting Up Real-Time Google Sheets Database (1-Minute Guide)

You can automatically store every participant's study results directly into a **Google Sheet** in real-time without installing any server or database tools.

---

## Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Name it **"Math Music User Study Results"**.
3. In Row 1, add these column headers (A through N):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Timestamp** | **Participant ID** | **Group** | **WMC Score** | **BFI Score** | **AMAS Score** | **Test 1 Condition** | **Test 1 Time** | **Test 1 Mistakes** | **Test 1 Mental Effort** | **Test 2 Condition** | **Test 2 Time** | **Test 2 Mistakes** | **Test 2 Mental Effort** |

---

## Step 2: Add Google Apps Script (Handles Both POST Data & GET Links)
1. In your Google Sheet, click **Extensions** → **Apps Script**.
2. Delete any code in `Code.gs` and paste the following script:

```javascript
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return HtmlService.createHtmlOutput(
    "<div style='font-family: Arial, sans-serif; padding: 30px; text-align: center;'>" +
    "<h2 style='color: #0284c7;'>✅ Math & Music User Study Database Active</h2>" +
    "<p style='color: #334155; font-size: 15px;'>This Webhook automatically receives real-time participant results.</p>" +
    "<div style='margin-top: 25px;'>" +
    "<a href='" + ss.getUrl() + "' target='_blank' style='background: #16a34a; color: white; padding: 12px 24px; font-weight: bold; border-radius: 8px; text-decoration: none; display: inline-block;'>" +
    "📊 Open Google Sheets Database Document ➔</a>" +
    "</div></div>"
  );
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    // 1. Parse JSON body
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

3. Click **Deploy** → **New Deployment**.
4. Select type: **Web App**.
5. Set:
   - **Execute as**: *Me*
   - **Who has access**: *Anyone* (Crucial!)
6. Click **Deploy**, authorize permissions, and copy the Web App URL!
