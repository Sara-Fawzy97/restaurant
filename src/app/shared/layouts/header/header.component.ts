import { ChangeDetectionStrategy,Component,inject, Input, viewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor() {
    // // #region agent log
    // try {
    //   console.log('[DEBUG] header.component.ts: HeaderComponent constructor');
    //   fetch('http://127.0.0.1:7242/ingest/4a3402cb-745f-4c1b-a6bc-08b78ceb57e8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'header.component.ts:14',message:'HeaderComponent constructor',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
    // } catch(e) {
    //   console.error('[DEBUG] Log setup failed:', e);
    // }
    // // #endregion
  }
  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogSignup() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogSignup);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  onSignInClick(event: Event): void {
    // Allow the link to navigate normally
    // This handler can be used for analytics or additional logic
    console.log('Sign in clicked');
    // Don't prevent default - let the link work normally
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  standalone: true,
  templateUrl: 'dialog-content-example-dialog.html',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {

  // @Input() greetSignUpFunction!:()=>void;
  constructor(private headerComp:HeaderComponent){}

  ngInit(){
    this.headerComp.openDialogSignup()

  }
}



@Component({
  selector: 'dialog-content-example-dialogSignup',
  standalone: true,
  templateUrl: 'dialog-content-example-dialogSignup.html',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialogSignup {

  constructor(private headerComp:HeaderComponent){}

  ngInit(){
    this.headerComp.openDialog()

  }
}