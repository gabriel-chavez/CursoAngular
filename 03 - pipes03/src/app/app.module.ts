import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//pipe personalizado
import {CapitalizadoPipe} from './pipes/capitalizado.pipe';

/**Español fecha
 * LOCALE_ID
 * import localeEs from '@angular/common/locales/es';
 * import { registerLocaleData } from '@angular/common';
*/
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { ContrasenaPipe } from './pipes/contrasena.pipe';
//
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    CapitalizadoPipe,
    DomseguroPipe,
    ContrasenaPipe
  ],
  imports: [
    BrowserModule
  ],
  //Fecha Español { provide: LOCALE_ID, useValue: 'es' }
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
