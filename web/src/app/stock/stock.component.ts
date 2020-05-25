import { Component, OnInit, ViewChild } from "@angular/core";
import { Stock, Type, State } from "../../models";
import { trigger, style, animate, transition, state } from "@angular/animations";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormControl } from "@angular/forms";
import { DialogStockComponent } from "../dialog-stock/dialog-stock.component";

@Component({
    selector: "app-stock",
    templateUrl: "./stock.component.html",
    styleUrls: ["./stock.component.scss"],
    animations: [
        trigger("detailExpand", [
            state("collapsed", style({ height: "0px", minHeight: "0" })),
            state("expanded", style({ height: "*" })),
            transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
        ]),
    ],
})
export class StockComponent implements OnInit {


    stock: Stock[];
    control = new FormControl();
    displayedColumns: string[] = ["id", "title", "author", "type", "source", "state", "action"];
    dataSource: MatTableDataSource<Stock>;
    expandedElement: Stock | null;
    stocks: Stock[];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    constructor(public dialog: MatDialog) {
        this.dataSource = new MatTableDataSource();
    }

    async ngOnInit(): Promise<void> {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.stocks = await this.getStock();
        this.dataSource.data = this.stocks;
    }

    openDialog(action, obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogStockComponent, {
            width: "400px",
            data: obj
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.event == "Add") {
                this.addRowData(result.data);
            } else if (result.event == "Update") {
                this.updateRowData(result.data);
            } else if (result.event == "Delete") {
                this.deleteRowData(result.data);
            }
        });
    }

    addRowData(rowObj) {
        const d = new Date();
        const stock: Stock = new Stock(rowObj.id, rowObj.type, rowObj.author, rowObj.title, rowObj.date, rowObj.state);
        this.dataSource.data.push(stock);
        this.table.renderRows();
    }
    updateRowData(rowObj) {
        this.dataSource.data = this.dataSource.data.filter((value, key) => {
            if (value.id == rowObj.id) {
                value.title = rowObj.title;
                value.author = rowObj.author;
                value.sourceDate = rowObj.sourceDate;
                value.state = rowObj.state;
                value.type = rowObj.type;
            }
            return true;
        });
    }
    deleteRowData(rowObj) {
        this.dataSource.data = this.dataSource.data.filter((value, key) => {
            return value.id != rowObj.id;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    async getStock(): Promise<Stock[]> {
        const stockArray: Stock[] = [];
        stockArray.push(new Stock("1", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.available));
        stockArray.push(new Stock("2", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.available));
        stockArray.push(new Stock("3", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.reserved));
        stockArray.push(new Stock("4", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.waste));
        stockArray.push(new Stock("5", Type.book, "Puzser robert", "A zsidok szegyene", new Date(), State.waste));
        stockArray.push(new Stock("6", Type.book, "Puzser robert", "A zsidok szegyene", new Date(), State.waste));
        return stockArray;
    }


}
