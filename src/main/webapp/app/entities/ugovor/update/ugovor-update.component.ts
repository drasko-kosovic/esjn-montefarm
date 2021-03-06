import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IUgovor, Ugovor } from '../ugovor.model';
import { UgovorService } from '../service/ugovor.service';
import {IPonudjaci} from "app/entities/ponudjaci/ponudjaci.model";
import {PonudjaciService} from "app/entities/ponudjaci/service/ponudjaci.service";


@Component({
  selector: 'jhi-ugovor-update',
  templateUrl: './ugovor-update.component.html',
  styleUrls:['./ugovor.scss']
})
export class UgovorUpdateComponent implements OnInit {
  isSaving = false;
  ponudjacis?: IPonudjaci[];
  ugovori?:IUgovor[];
  nadji?:any;

  editForm = this.fb.group({
    id: [],
    brojUgovora: [null, [Validators.required]],
    datumUgovora: [null, [Validators.required]],
    predmetUgovora: [null, [Validators.required]],
    brojDatumTenderskeDokumntacije: [null, [Validators.required]],
    brojDatumOdlukeIzbora: [null, [Validators.required]],
    brojDatumPonude: [null, [Validators.required]],
    iznosUgovoraBezPdf: [null, [Validators.required]],
    sifraPostupka: [null, [Validators.required]],
    ponudjaci: [null, [Validators.required]],
    sifraPonude: [null, [Validators.required]],
  });

  constructor(protected ugovorService: UgovorService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder,
              protected ponudjaciService:PonudjaciService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ugovor }) => {
      this.updateForm(ugovor);
      this.getAllPonudjaci();
    });
  }
  public getAllPonudjaci(): void {
    this.ponudjaciService.ponudjaciAll().subscribe((res: IPonudjaci[]) => {
      this.ponudjacis = res;
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }
  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ugovor = this.createFromForm();
    if (ugovor.id !== undefined) {
      this.subscribeToSaveResponse(this.ugovorService.update(ugovor));
    } else {
      this.subscribeToSaveResponse(this.ugovorService.create(ugovor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUgovor>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(ugovor: IUgovor): void {
    this.editForm.patchValue({
      id: ugovor.id,
      brojUgovora: ugovor.brojUgovora,
      datumUgovora: ugovor.datumUgovora,
      predmetUgovora: ugovor.predmetUgovora,
      nazivPonudjaca: ugovor.nazivPonudjaca,
      brojDatumTenderskeDokumntacije: ugovor.brojDatumTenderskeDokumntacije,
      brojDatumOdlukeIzbora: ugovor.brojDatumOdlukeIzbora,
      brojDatumPonude: ugovor.brojDatumPonude,
      iznosUgovoraBezPdf: ugovor.iznosUgovoraBezPdf,
      sifraPostupka: ugovor.sifraPostupka,
      sifraPonude: ugovor.sifraPonude,
      ponudjaci: ugovor.ponudjaci,
    });
  }

  protected createFromForm(): IUgovor {
    return {
      ...new Ugovor(),
      id: this.editForm.get(['id'])!.value,
      brojUgovora: this.editForm.get(['brojUgovora'])!.value,
      datumUgovora: this.editForm.get(['datumUgovora'])!.value,
      predmetUgovora: this.editForm.get(['predmetUgovora'])!.value,
      brojDatumTenderskeDokumntacije: this.editForm.get(['brojDatumTenderskeDokumntacije'])!.value,
      brojDatumOdlukeIzbora: this.editForm.get(['brojDatumOdlukeIzbora'])!.value,
      brojDatumPonude: this.editForm.get(['brojDatumPonude'])!.value,
      iznosUgovoraBezPdf: this.editForm.get(['iznosUgovoraBezPdf'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      sifraPonude: this.editForm.get(['sifraPonude'])!.value,
      ponudjaci: this.editForm.get(['ponudjaci'])!.value,
    };
  }
}
