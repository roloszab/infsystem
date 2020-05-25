import { Component, Inject, Optional } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Member } from "../../models";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class MemberErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

}


@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html",
  styleUrls: ["./dialog-box.component.scss"]
})
export class DialogBoxComponent {

  action: string;
  localData: any;
  nameFormControl = new FormControl("", [
    Validators.required
  ]);
  phoneFormControl = new FormControl("", [
    Validators.required
  ]);
  idFormControl = new FormControl("", [
    Validators.required
  ]);
  addressFormControl = new FormControl("", [
    Validators.required
  ]);

  matcher = new MemberErrorStateMatcher();
  memberValid = false;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Member) {
    console.log(data);
    this.localData = { ...data };
    this.action = this.localData.action;
    if (this.action == "Delete") {
      this.memberValid = true;
    }
  }
  checkMember() {

    if (
      !this.nameFormControl.hasError("required") &&
      !this.phoneFormControl.hasError("required") &&
      !this.idFormControl.hasError("required") &&
      !this.addressFormControl.hasError("required")
    ) {
      this.memberValid = true;
    }
  }

  doAction() {

    this.dialogRef.close({ event: this.action, data: this.localData });

  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }

}
