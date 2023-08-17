import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/products/models/product';
import { ProductService } from 'src/app/products/services/product.service';
import { FormHelperService } from 'src/app/shared/HelperServices/FormHelper';
import { OrderService } from '../../services/order.service';
import { zip } from 'rxjs';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {
  orderForm: FormGroup
    = new FormGroup(
      {
        selectedPaymentMethod: new FormControl(1, Validators.required),
        products: this.fb.array([], Validators.required),
        selectedUser: new FormControl(null, Validators.required)

      },
    );
  productList: Product[];
  userList: User[];
  PaymentMethod: any[] = [
    { name: 'Online', key: 1 },
    { name: 'Cash', key: 2 },
  ];
  constructor(private ProductService: ProductService, private FormHelperService: FormHelperService,
    private cdref: ChangeDetectorRef,
    private OrderService: OrderService,
    private dialogRef: DynamicDialogRef,
    private AlertService: AlertService,

    private fb: FormBuilder) {
    this.LoadForm();

  }

  LoadForm() {
    zip(
      this.ProductService.getProducts(),

      this.OrderService.getusers())
      .subscribe(res => {
        this.productList = res[0];
        this.userList = res[1];
        this.addproduct()
      })
  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  get products() {
    return this.orderForm.controls["products"] as FormArray;
  }

  addproduct() {
    const productForm = this.fb.group({
      ProductId: [null, Validators.required],
      Quantity: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(999)]),
      ProductPrice: new FormControl(0)
    });
    this.products.push(productForm);
  }

  deleteproduct(productIndex: number) {
    this.products.removeAt(productIndex);
  }
  ngOnInit(): void {
  }
  TotalPrice
  onChange(e, productForm) {
    let id = productForm.value.ProductId
    //get product by id and get the available quaninty
    this.ProductService.getProduct(id).subscribe(productResp => {
      productForm.controls['Quantity'].addValidators(Validators.max(productResp.AvailablePieces))
      productForm.controls['ProductPrice'].patchValue(productResp.ProductPrice)
    })
  }
  creatOrderObject() {
    let formValue = this.orderForm.value;

    let createdOrder: Order;
    createdOrder = {
      OrderDate: new Date(),
      PaymentType: formValue.selectedPaymentMethod,
      UserId: formValue.selectedUser,
      Products: formValue.products,
      //TotalPrice:
    }
    return createdOrder;
  }
  getTotalPrice() {
    return this.creatOrderObject().Products.reduce(
      (acc: number, product: Product) => {
        return acc + product.ProductPrice * product.Quantity
      },
      0)
  }
  onClear() { }
  // CheckProduct(event, product: Product) {
  //   if (event) {
  //     let selected: any[] = this.orderForm.value['productSelections'];
  //     selected.push(product.ProductId);
  //     this.orderForm.controls['productSelections'].patchValue(selected)
  //   }
  //   else {
  //     let selected: any[] = this.orderForm.value['productSelections'];

  //   }
  // }
  PaymentMethodChanged(e) { }

  Save() {
    //call API with
    this.OrderService.AddNewOrder(this.creatOrderObject()).subscribe(response => {
      this.AlertService.showMessage('success', 'Saved Successfully')
      this.dialogRef.close()
    });
  }
  Close() {
    this.dialogRef.close();
  }
}
