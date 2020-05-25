import { Component, OnInit, ViewChild } from "@angular/core";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { Stock, Member, State, Type } from "src/models";
import { FormControl } from "@angular/forms";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { DialogRentComponent } from "../dialog-rent/dialog-rent.component";

@Component({
  selector: "app-rent",
  templateUrl: "./rent.component.html",
  styleUrls: ["./rent.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
    ]),
  ],
})
export class RentComponent implements OnInit {

  control = new FormControl();
  displayedColumns: string[] = ["memberid", "stockid", "stocktitle", "membername", "idCardNumber", "action"];
  dataSource: MatTableDataSource<{ stock: Stock, member: Member }>;
  expandedElement: Member | null;
  rent: { stock: Stock, member: Member }[];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  async ngOnInit(): Promise<void> {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.rent = await this.getRent();
    this.dataSource.data = this.rent;
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogRentComponent, {
      width: "400px",
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == "Add") {
        this.addRowData(result.data);
      } else if (result.event == "Delete") {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObj) {
    const d = new Date();
    const member: Member = new Member();
    member.id = rowObj.member.id;
    const stock: Stock = new Stock();
    stock.id = rowObj.stock.id;
    this.dataSource.data.push({ stock, member });
    this.table.renderRows();
  }
  deleteRowData(rowObj) {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value.stock.id != rowObj.stock.id || value.member.id != rowObj.member.id;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getRent(): Promise<{ stock: Stock, member: Member }[]> {
    const members: Member[] = [];
    const stocks: Stock[] = [];
    stocks.push(new Stock("1", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.available));
    stocks.push(new Stock("2", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.available));
    stocks.push(new Stock("3", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.reserved));
    stocks.push(new Stock("4", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.waste));
    stocks.push(new Stock("5", Type.book, "Puzser robert", "A zsidok szegyene", new Date(), State.waste));
    stocks.push(new Stock("6", Type.book, "Puzser robert", "A zsidok szegyene", new Date(), State.waste));
    for (let i = 0; i < 50; ++i) {
      const member: Member = new Member();
      member.id = i + 1;
      member.name = "Brenda C Smith";
      member.phoneNumber = "(843) 875-8637";
      member.idCardNumber = "579023KA";
      member.address = "1056 Friartuck Trl, Ladson, SC, 29456";
      for (let j = 0; j < i % 7; ++j) {
        member.stock.push(stocks[j]);
      }
      members.push(member);
    }
    const teszt: Member = new Member();
    teszt.id = 51;
    teszt.name = "Fazekas Levente";
    teszt.phoneNumber = "+36 30 307 9443";
    teszt.idCardNumber = "579023SA";
    teszt.address = "3506 Miskolc, Kertesz utca 8.";
    members.push(teszt);
    const rent: { stock: Stock, member: Member }[] = [];
    members.forEach(member => {
      member.stock.forEach(stock => {
        rent.push({ stock, member });
      });
    });
    return rent;
  }

}
