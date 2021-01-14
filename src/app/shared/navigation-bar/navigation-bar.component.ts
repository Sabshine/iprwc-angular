import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CartService } from 'src/app/cart/cart.service';
import { AuthService } from '../../authentication/auth.service';
import { ProductAmountModel } from '../models/product-amount.model';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  isLoggedIn: boolean | undefined
  isUserAdmin: boolean | undefined
  cartItems: ProductAmountModel[] | undefined

  constructor(private router: Router, private cartService: CartService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  //   this.activatedRoute.paramMap.subscribe( paramMap => {
  //     console.log(paramMap.get('home'))
  // })
    this.authService.isLoggedInSubject.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isUserAdmin = this.authService.isAdmin();
    this.cartService.cartSubject.subscribe((newShoppingCartItems) => {
      this.cartItems = newShoppingCartItems
    })
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  onLogout() {
    // localStorage.removeItem('expirationDate');
    window.localStorage.clear()
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  onOrders() {
    this.isUserAdmin = this.authService.isAdmin()
    if (this.isUserAdmin){
      this.router.navigate(['/all'])
    } else {
      this.router.navigate(['/orders'])
    }
  }

  goToAddProducts(){
    this.router.navigate(['/products/add'])
  }

  goToHome() {
    this.router.navigate(['/home'])
  }


  goToCart() {
    this.router.navigate(['/cartitems'])
  }

}
