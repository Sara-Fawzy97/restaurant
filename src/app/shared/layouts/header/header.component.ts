import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor() {
    // #region agent log
    try {
      console.log('[DEBUG] header.component.ts: HeaderComponent constructor');
      fetch('http://127.0.0.1:7242/ingest/4a3402cb-745f-4c1b-a6bc-08b78ceb57e8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'header.component.ts:14',message:'HeaderComponent constructor',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
    } catch(e) {
      console.error('[DEBUG] Log setup failed:', e);
    }
    // #endregion
  }
  
  onSignInClick(event: Event): void {
    // Allow the link to navigate normally
    // This handler can be used for analytics or additional logic
    console.log('Sign in clicked');
    // Don't prevent default - let the link work normally
  }
}
