import { Component, OnInit, ViewChild } from "@angular/core";
import { Stock, Type, State } from "../../models";
import { trigger, style, animate, transition, state } from "@angular/animations";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormControl } from "@angular/forms";
import { DialogStockComponent } from "../dialog-stock/dialog-stock.component";
import { DataService } from "../data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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

    constructor(
        public dialog: MatDialog,
        private data: DataService,
        private snackBar: MatSnackBar
    ) {
        this.dataSource = new MatTableDataSource();
    }

    async ngOnInit(): Promise<void> {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getStocks();
    }

    openDialog(action, obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogStockComponent, {
            width: "400px",
            data: obj
        });

        dialogRef.afterClosed().subscribe(async result => {
            if (result.event == "Add") {
                result.data.state = "0";
                result.data.sourceDate = new Date().toISOString().split("T")[0];
                this.data.addStock(result.data).subscribe(r => { this.openSnackBar(r.result, "OK"); });
                await this.delay(440);
                this.getStocks();
            } else if (result.event == "Update") {
                const id = result.data.id;
                const title = result.data.title;
                const author = result.data.author;
                const type = result.data.type;
                const sourceDate = new Date(result.data.sourceDate).toISOString().split("T")[0];
                this.data.updateStock({ id, title, author, type, sourceDate }).subscribe(r => { this.openSnackBar(r.result, "OK"); });
                await this.delay(440);
                this.getStocks();
            } else if (result.event == "Delete") {
                this.data.deleteStock(result.data).subscribe(r => { this.openSnackBar(r.result, "OK"); });
                await this.delay(440);
                this.getStocks();
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    async getStocks() {
        await this.data.getStocks()
            .subscribe(m => {
                this.dataSource.data = m;
            });
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 4000,
        });

    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


}
