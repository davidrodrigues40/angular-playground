import { DefaultFooterComponent } from 'src/app/footers/default-footer/default-footer.component';
import { HomeMenuComponent } from 'src/app/footers/home-menu/home-menu.component';

import { Type } from '@angular/core';

export enum FooterTypes
{
   home = '/home',
   ngrx = '/home/ngrx',
   dataflow = '/home/dataflow',
   default = ''
}

export type FooterComponentType =
   HomeMenuComponent |
   DefaultFooterComponent;

export const FooterComponentFactory:
   Record<FooterTypes, Type<FooterComponentType>> = {
   [FooterTypes.ngrx]: HomeMenuComponent,
   [FooterTypes.dataflow]: HomeMenuComponent,
   [FooterTypes.home]: HomeMenuComponent,
   [FooterTypes.default]: DefaultFooterComponent
};

