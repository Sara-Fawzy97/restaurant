import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from "./shared/layouts/footer/footer.component";
// #region agent log
try {
  console.log('[DEBUG] app.component.ts: Importing HeaderComponent');
  fetch('http://127.0.0.1:7242/ingest/4a3402cb-745f-4c1b-a6bc-08b78ceb57e8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.component.ts:7',message:'Importing HeaderComponent',data:{path:'./header/header.component'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
} catch(e) {
  console.error('[DEBUG] Log setup failed:', e);
}
// #endregion

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'restaurant';
  
  constructor() {
    // #region agent log
    try {
      console.log('[DEBUG] app.component.ts: AppComponent constructor', this.title);
      fetch('http://127.0.0.1:7242/ingest/4a3402cb-745f-4c1b-a6bc-08b78ceb57e8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app.component.ts:23',message:'AppComponent constructor',data:{title:this.title},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
    } catch(e) {
      console.error('[DEBUG] Log setup failed:', e);
    }
    // #endregion
  }
}
