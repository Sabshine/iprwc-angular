import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @ViewChild('productForm') productForm: NgForm | undefined
  selectedImage: string | undefined;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  onImageAdded(event: any): void {
    this.selectedImage = this.productForm.value.image
  }

  onSubmit() {
    if (this.productForm !== undefined) {
      this.productService.addProduct({
        productId: undefined,
        productName: String(this.productForm.value.name),
        productPrice: String(this.productForm.value.price),
        productDescription: String(this.productForm.value.description),
        productCategorie: String(this.productForm.value.categorie),
        productUrl: String(this.productForm.value.image),
        isActive: undefined
      }).subscribe((response) => {
        alert('Product added. You will be redirect in a couple of seconds')
        setTimeout(() => {
          this.router.navigate(['', 'home'])
        }, 3000)
      }, (error) => {
        alert('Failed to add product. Please try again later!')
      })
    }
  }
}