/**
 * DailyTrend Push Subscriptions — Google Apps Script
 * 
 * À coller dans Extensions > Apps Script du Sheet "DailyTrend Push Subscriptions"
 * En-têtes: A=endpoint, B=keys_p256dh, C=keys_auth, D=date
 * 
 * Déploiement: Déployer > Nouvelle déploiement > Web App
 *   - Exécuter en tant que: Moi
 *   - Qui a accès: Tout le monde
 */

// Recevoir une nouvelle subscription (POST)
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    if (data.action === 'subscribe') {
      var sub = data.subscription;
      
      // Vérifier si déjà inscrit (par endpoint)
      var rows = sheet.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][0] === sub.endpoint) {
          // Déjà inscrit, mettre à jour la date
          sheet.getRange(i + 1, 4).setValue(new Date().toISOString());
          return ContentService.createTextOutput(JSON.stringify({
            status: 'ok',
            message: 'Subscription mise à jour'
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      // Nouvelle inscription
      sheet.appendRow([
        sub.endpoint,
        sub.keys ? sub.keys.p256dh : '',
        sub.keys ? sub.keys.auth : '',
        new Date().toISOString()
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({
        status: 'ok',
        message: 'Subscription enregistrée'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.action === 'unsubscribe') {
      var endpoint = data.endpoint;
      var rows = sheet.getDataRange().getValues();
      for (var i = rows.length - 1; i >= 1; i--) {
        if (rows[i][0] === endpoint) {
          sheet.deleteRow(i + 1);
          break;
        }
      }
      return ContentService.createTextOutput(JSON.stringify({
        status: 'ok',
        message: 'Désinscrit'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Action inconnue'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Récupérer les subscriptions (GET) — utilisé par le script push
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var subscriptions = [];
    
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][0]) {
        subscriptions.push({
          endpoint: rows[i][0],
          keys: {
            p256dh: rows[i][1],
            auth: rows[i][2]
          },
          date: rows[i][3]
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'ok',
      count: subscriptions.length,
      subscriptions: subscriptions
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
