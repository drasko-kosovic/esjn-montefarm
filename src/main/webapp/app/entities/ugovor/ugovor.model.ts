import * as dayjs from 'dayjs';

export interface IUgovor {
  id?: number;
  brojUgovora?: string;
  datumUgovora?: dayjs.Dayjs;
  predmetUgovora?: string;
  nazivPonudjaca?: string;
  brojDatumTenderskeDokumntacije?: string;
  brojDatumOdlukeIzbora?: string;
  brojDatumPonude?: string;
  iznosUgovoraBezPdf?: number;
}

export class Ugovor implements IUgovor {
  constructor(
    public id?: number,
    public brojUgovora?: string,
    public datumUgovora?: dayjs.Dayjs,
    public predmetUgovora?: string,
    public nazivPonudjaca?: string,
    public brojDatumTenderskeDokumntacije?: string,
    public brojDatumOdlukeIzbora?: string,
    public brojDatumPonude?: string,
    public iznosUgovoraBezPdf?: number
  ) {}
}

export function getUgovorIdentifier(ugovor: IUgovor): number | undefined {
  return ugovor.id;
}
