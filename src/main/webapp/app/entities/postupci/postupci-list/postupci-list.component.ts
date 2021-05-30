import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IPostupci } from 'app/entities/postupci/postupci.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PostupciService } from 'app/entities/postupci/service/postupci.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PostupciDeleteDialogComponent } from 'app/entities/postupci/delete/postupci-delete-dialog.component';

@Component({
  selector: 'jhi-postupci-list',
  templateUrl: './postupci-list.component.html',
  styleUrls: ['./postupci-list.component.scss'],
})
export class PostupciListComponent implements OnInit, AfterViewInit {
  postupaks?: IPostupci[];

  public displayedColumns = ['sifra postupka', 'opis postupka', 'vrsta postupka', 'datum objave', 'broj tendera'];
  public dataSource = new MatTableDataSource<IPostupci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    protected postupciService: PostupciService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  // public getAllPostupak(): void {
  //   this.postupciService.postupakAll().subscribe((res: IPonude[]) => {
  //     this.dataSource.data = res;
  //     // eslint-disable-next-line no-console
  //     console.log(res);
  //   });

  // }
  loadAll(): void {
    this.postupciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
      this.dataSource.data = res.body ?? [];
    });
  }

  delete(postupci: IPostupci[]): void {
    const modalRef = this.modalService.open(PostupciDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.postupci = postupci;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string): any => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };
}