import { ChangeDetectionStrategy,Component,inject, Input, viewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../interfaces/User';
import { map, Observable } from 'rxjs';
// import { SideCartComponent } from "../side-cart/side-cart.component";
import { CommonModule, AsyncPipe } from '@angular/common'; // استيراد الـ AsyncPipe
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule,RouterModule, CommonModule,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  
  cartItemsCount$: Observable<number>;
  constructor(private cartService:CartService) {
// this.cartService.cart$.subscribe(items=>{this.cartCount=this.cartService.getTotalItems()
// })

// بنخلي المتغير ده يشوف الـ Subject اللي في الخدمة ويحسب العدد
    this.cartItemsCount$ = this.cartService.cart$.pipe(
      map(items => items.reduce((acc, curr) => acc + curr.quantity,0))
    );
    
    // // #region agent log
    // try {
    //   console.log('[DEBUG] header.component.ts: HeaderComponent constructor');
    //   fetch('http://127.0.0.1:7242/ingest/4a3402cb-745f-4c1b-a6bc-08b78ceb57e8',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'header.component.ts:14',message:'HeaderComponent constructor',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'D'})}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
    // } catch(e) {
    //   console.error('[DEBUG] Log setup failed:', e);
    // }
    // // #endregion
  }
// cartCount=0

//  cartCount$ = this.cartService.cart$.pipe(
  //  map(() => this.cartService.getTotalItems())
// );

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
      console.log(`Dialog : ${result}`);
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
  readonly dialog = inject(MatDialog);
   
  constructor(private authService:AuthService){}
users:User[]=[]
ngOnInit(){
  this.signIn()
}

  signIn(){
     this.authService.getAllUsers().subscribe({
      next:(data:any)=>{
        this.users=data
        console.log(this.users)
      },
      error:(error)=>{
        console.error(error)
      }
     })
  }


  register(){}

  openDialogSignup() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogSignup);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result in: ${result}`);
    });
  }
}

////////////////////////** */

@Component({
  selector: 'dialog-content-example-dialogSignup',
  standalone: true,
  templateUrl: 'dialog-content-example-dialogSignup.html',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialogSignup {
 
  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}