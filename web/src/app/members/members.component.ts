import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { Stock, State, Type, Member } from "../../models";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
    selector: "app-members",
    templateUrl: "./members.component.html",
    styleUrls: ["./members.component.scss"],
    animations: [
        trigger("detailExpand", [
            state("collapsed", style({ height: "0px", minHeight: "0" })),
            state("expanded", style({ height: "*" })),
            transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
        ]),
    ],
})
export class MembersComponent implements OnInit {
    stock: Stock[];
    control = new FormControl();
    displayedColumns: string[] = ["id", "name", "phoneNumber", "idCardNumber", "address", "action"];
    dataSource: MatTableDataSource<Member>;
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
        this.getMembers();
    }

    openDialog(action, obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogBoxComponent, {
            width: "400px",
            data: obj
        });
        dialogRef.afterClosed().subscribe(async result => {
            if (result.event == "Add") {
                this.data.addMember(result.data).subscribe(r => { this.openSnackBar(r.result, "OK"); });
                await this.delay(440);
                this.getMembers();
            } else if (result.event == "Update") {
                this.data.updateMember(result.data).subscribe(r => { this.openSnackBar(r.result, "OK"); });
                await this.delay(440);
                this.getMembers();
            } else if (result.event == "Delete") {
                this.data.deleteMember(result.data).subscribe(r => { this.openSnackBar(r.result, "OK"); });
                await this.delay(440);
                this.getMembers();
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

    async getMembers() {
        await this.data.getMembers()
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

