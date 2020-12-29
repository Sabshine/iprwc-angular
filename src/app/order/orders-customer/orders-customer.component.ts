import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders-customer',
  templateUrl: './orders-customer.component.html',
  styleUrls: ['./orders-customer.component.css']
})
export class OrdersCustomerComponent implements OnInit {
  orders = []
  
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrdersOfCustomer().subscribe((orders) => {
      // @ts-ignore
      this.orders = orders.content.reverse()
    }, (error) => {
      alert('Failed to fetch your orders. Try logging in again.')
    })
  }

}
