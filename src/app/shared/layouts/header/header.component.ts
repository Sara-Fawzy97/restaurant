import { ChangeDetectionStrategy, Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../interfaces/User';
import { map, Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, AsyncPipe, isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule,RouterModule, CommonModule,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  
  cartItemsCount$: Observable<number>;
  constructor(
    private cartService: CartService, 
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
// this.cartService.cart$.subscribe(items=>{this.cartCount=this.cartService.getTotalItems()
// })

// بنخلي المتغير ده يشوف الـ Subject اللي في الخدمة ويحسب العدد
    this.cartItemsCount$ = this.cartService.cart$.pipe(
      map(items => items.reduce((acc, curr) => acc + curr.quantity,0))
    );
    
  
  }
// islogged=this.authService.isLoggedIn$
  readonly dialog = inject(MatDialog);
  openDialog() {
    // لا تفتح الـ dialog إذا كان المستخدم مسجل دخول
    if (this.isLogged) {
      return;
    }
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogSignup() {
    // لا تفتح الـ dialog إذا كان المستخدم مسجل دخول
    if (this.isLogged) {
      return;
    }
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

  get isLogged(){
    let token=this.authService.hasToken()
    if(token){
      return true
    }
    return false
  }

  logOut(){
    this.authService.logOut();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('UserCode');
    }
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  standalone: true,
  templateUrl: 'dialog-content-example-dialog.html',
  imports: [MatDialogModule, MatButtonModule, FormsModule,ReactiveFormsModule,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {
  readonly dialog = inject(MatDialog);
   
  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

ngOnInit(){
}
  // this.signIn()}
// loginForm=this.fb.group({
//   userName:[''],
//   password:['']
// })

islogged=this.authService.isLoggedIn$

  signIn(userEmail: string, password: any){
    this.authService.login(userEmail, password).subscribe({
      next: (data: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('Token', 'Fake-token');
          localStorage.setItem('UserCode', data.usercode);
        }
        console.log(data);
        this.dialog.closeAll(); // إغلاق جميع الـ dialogs
        this.router.navigateByUrl('/profile');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }



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
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule,CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialogSignup {
 
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

registerForm=this.fb.group({
  userEmail:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.maxLength(8)]]
})
islogged=this.authService.isLoggedIn$

  //credentials c=> form value
  registerUser(credentials: any){
    this.authService.registerUser(credentials).subscribe({
      next: (data: any) => {
        console.log("credentials: ", credentials);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('User', data);
          localStorage.setItem('Token', 'Fake-token');
        }
        console.log(data);
        this.dialog.closeAll(); // إغلاق جميع الـ dialogs
        this.router.navigateByUrl('/profile');
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

}