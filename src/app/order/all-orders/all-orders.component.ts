import { Component, OnInit } from '@angular/core';
import { OrderModel } from "../order";
import { OrderService } from "../order.service";

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  orders = []

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getAllOrders().subscribe((allOrders) => {
      this.orders = allOrders.content;
    }, error => {
      alert('Failed to fetch all the orders. Try again later.')
    })
  }

}