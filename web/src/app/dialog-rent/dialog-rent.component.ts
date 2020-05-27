import { Component, Inject, Optional } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Stock, Member } from "../../models";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class StockErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}


@Component({
  selector: "app-dialog-rent",
  templateUrl: "./dialog-rent.component.html",
  styleUrls: ["./dialog-rent.component.scss"]
})
export class DialogRentComponent {

  action: string;
  localData: any;

  matcher = new StockErrorStateMatcher();
  rentValid = false;

  IDFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^[0-9]+$")
  ]);

  constructor(
    public dialogRef: MatDialogRef<DialogRentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { stock: Stock, member: Member }) {
    this.localData = { ...data };
    this.action = this.localData.action;
    if (this.action == "Add") {
      const member: Member = new Member();
      const stock: Stock = new Stock();
      this.localData.member = member;
      this.localData.stock = stock;

    }
    if (this.action == "Delete") {
      this.rentValid = true;
    }
    console.log(this.localData);
  }

  checkRent() {

    if (
      !this.IDFormControl.hasError("required") &&
      !this.IDFormControl.hasError("pattern")
    ) {
      this.rentValid = true;
    }
  }

  doAction() {

    this.dialogRef.close({ event: this.action, data: this.localData });

  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }

}
