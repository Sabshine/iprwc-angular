import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm} from "@angular/forms";
import { ProductService } from "../product.service";
import { ToastService } from "../../shared/toast-service/toast.service";
import { ActivatedRoute, Router} from "@angular/router";
import { ProductModel } from "../../shared/models/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @ViewChild('productForm') productForm: NgForm | undefined
  selectedImage: string | undefined

  existingProduct: ProductModel | undefined
  constructor(private productService: ProductService, private toastService: ToastService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
       this.productService.getProductById(params.productId).subscribe((product) => {
         this.existingProduct = product.content[0]
         this.selectedImage = this.existingProduct.productUrl;
       }, error => {
         // TODO add 404 if the product is not found
       })
    });
  }

  onImageAdded(event: any): void {
    this.selectedImage = this.productForm.value.image
  }

  onSubmit() {
    if (this.productForm !== undefined) {
      this.productService.editProduct({
        productId: this.existingProduct.productId,
        productName: String(this.productForm.value.name),
        productPrice: String(this.productForm.value.price),
        productDescription: String(this.productForm.value.description),
        productCategorie: String(this.productForm.value.categorie),
        productUrl: String(this.productForm.value.image),
        isActive: undefined,
      }).subscribe((response) => {
        alert('Edited existing product. You will be redirected to the manage page')
        setTimeout(() => {
          this.router.navigate(['', 'home'])
        }, 3000)
      }, (error) => {
        alert('Failed to add product. Please try again later!')
      })
    }
  }
}