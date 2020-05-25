import { Component, OnInit, Optional, Inject } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Stock } from 'src/models';

export class StockErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}

@Component({
  selector: "app-dialog-stock",
  templateUrl: "./dialog-stock.component.html",
  styleUrls: ["./dialog-stock.component.scss"]
})
export class DialogStockComponent {

  action: string;
  localData: any;
  titleFormControl = new FormControl("", [
    Validators.required
  ]);
  authorFormControl = new FormControl("", [
    Validators.required
  ]);
  typeFormControl = new FormControl("", [
    Validators.required
  ]);
  stateFormControl = new FormControl("", [
    Validators.required
  ]);

  matcher = new StockErrorStateMatcher();
  stockValid = false;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Stock) {
    this.localData = { ...data };
    this.action = this.localData.action;
    if (this.action == "Delete") {
      this.stockValid = true;
    }
  }
  checkStock() {

    if (
      !this.titleFormControl.hasError("required") &&
      !this.authorFormControl.hasError("required") &&
      !this.typeFormControl.hasError("required") &&
      !this.stateFormControl.hasError("required")
    ) {
      this.stockValid = true;
    }
  }

  doAction() {

    this.dialogRef.close({ event: this.action, data: this.localData });

  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }


}
