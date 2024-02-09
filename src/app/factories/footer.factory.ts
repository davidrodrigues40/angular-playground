import { BooksFooterComponent } from 'src/app/footers/books-footer/books-footer.component';
import { ChuckNorrisFooterComponent } from 'src/app/footers/chuck-norris-footer/chuck-norris-footer.component';
import { DefaultFooterComponent } from 'src/app/footers/default-footer/default-footer.component';
import { HomeMenuComponent } from 'src/app/footers/home-menu/home-menu.component';

import { Type } from '@angular/core';

export enum FooterTypes
{
   home = '/home',
   ngrx = '/home/ngrx',
   dataflow = '/home/dataflow',
   chuckNorris = '/chuck-norris-facts',
   books = '/books',
   default = ''
}

export type FooterComponentType =
   HomeMenuComponent |
   ChuckNorrisFooterComponent |
   DefaultFooterComponent;

export const FooterComponentFactory:
   Record<FooterTypes, Type<FooterComponentType>> = {
   [FooterTypes.ngrx]: HomeMenuComponent,
   [FooterTypes.dataflow]: HomeMenuComponent,
   [FooterTypes.home]: HomeMenuComponent,
   [FooterTypes.chuckNorris]: ChuckNorrisFooterComponent,
   [FooterTypes.books]: BooksFooterComponent,
   [FooterTypes.default]: DefaultFooterComponent
};

