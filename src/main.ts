import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// #region agent log
try {
  console.log('[DEBUG] main.ts: Bootstrap starting');
  fetch('http://127.0.0.1:7242/ingest/4a3402cb-745f-4c1b-a6bc-08b78ceb57e8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.ts:7',message:'Bootstrap starting',data:{component:'AppComponent'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
} catch(e) {
  console.error('[DEBUG] Log setup failed:', e);
}
// #endregion

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    // #region agent log
    try {
      console.log('[DEBUG] main.ts: Bootstrap successful');
      fetch('http://127.0.0.1:7242/ingest/4a3402cb-745f-4c1b-a6bc-08b78ceb57e8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.ts:16',message:'Bootstrap successful',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
    } catch(e) {
      console.error('[DEBUG] Log setup failed:', e);
    }
    // #endregion
  })
  .catch((err) => {
    // #region agent log
    try {
      console.error('[DEBUG] main.ts: Bootstrap error', err);
      fetch('http://127.0.0.1:7242/ingest/4a3402cb-745f-4c1b-a6bc-08b78ceb57e8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.ts:24',message:'Bootstrap error',data:{error:err?.message||String(err),stack:err?.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
    } catch(e) {
      console.error('[DEBUG] Log setup failed:', e);
    }
    // #endregion
    console.error(err);
  });
