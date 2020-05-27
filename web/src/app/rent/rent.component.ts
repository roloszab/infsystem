import { Component, OnInit, ViewChild } from "@angular/core";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { Stock, Member, State, Type } from "src/models";
import { FormControl } from "@angular/forms";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { DialogRentComponent } from "../dialog-rent/dialog-rent.component";
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        this.getRents();
    }

    openDialog(action, obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogRentComponent, {
            width: "400px",
            data: obj
        });

        dialogRef.afterClosed().subscribe(async result => {
            if (result.event == "Add") {
                const stock = result.data.stock;
                const member = result.data.member;
                this.data.addRent({ stock, member }).subscribe(r => { this.openSnackBar(r.result, "OK"); });
                await this.delay(440);
                this.getRents();
            } else if (result.event == "Delete") {
                this.data.deleteRent(result.data.stock).subscribe(r => { this.openSnackBar(r.result, "OK"); });
                await this.delay(440);
                this.getRents();
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

    async getRents() {
        await this.data.getRents()
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
