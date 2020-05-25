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
    members: Member[];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatTable, { static: true }) table: MatTable<any>;

    constructor(public dialog: MatDialog) {
        this.dataSource = new MatTableDataSource();
    }

    async ngOnInit(): Promise<void> {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.members = await this.getMembers();
        this.dataSource.data = this.members;
    }

    openDialog(action, obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(DialogBoxComponent, {
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
        const member: Member = new Member();
        member.id = rowObj.id;
        member.name = rowObj.name;
        member.idCardNumber = rowObj.idCardNumber;
        member.address = rowObj.address;
        member.phoneNumber = rowObj.phoneNumber;
        this.dataSource.data.push(member);
        this.table.renderRows();
    }
    updateRowData(rowObj) {
        this.dataSource.data = this.dataSource.data.filter((value, key) => {
            if (value.id == rowObj.id) {
                value.name = rowObj.name;
                value.address = rowObj.address;
                value.idCardNumber = rowObj.idCardNumber;
                value.phoneNumber = rowObj.phoneNumber;
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

    async getMembers(): Promise<Member[]> {
        const members: Member[] = [];
        this.stock = [];
        this.stock.push(new Stock("1", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.available));
        this.stock.push(new Stock("2", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.available));
        this.stock.push(new Stock("3", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.reserved));
        this.stock.push(new Stock("4", Type.CD, "Fabri Zoltan", "Az otodik pecset", new Date(), State.waste));
        this.stock.push(new Stock("5", Type.book, "Puzser robert", "A zsidok szegyene", new Date(), State.waste));
        this.stock.push(new Stock("6", Type.book, "Puzser robert", "A zsidok szegyene", new Date(), State.waste));
        for (let i = 0; i < 50; ++i) {
            const member: Member = new Member();
            member.id = i + 1;
            member.name = "Brenda C Smith";
            member.phoneNumber = "(843) 875-8637";
            member.idCardNumber = "579023KA";
            member.address = "1056 Friartuck Trl, Ladson, SC, 29456";
            for (let j = 0; j < i % 7; ++j) {
                member.stock.push(this.stock[j]);
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
        return members;
    }
}

