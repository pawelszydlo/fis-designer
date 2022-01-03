import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {TooltipModule} from '../../tooltip/tooltip.module';
import {ConfigSharedModule} from '../shared/config-shared.module';

import {DisplayComponent} from './display.component';
import {GaugeComponent} from './gauge/gauge.component';
import {NeedleComponent} from './needle/needle.component';
import {NumericalSetupComponent} from './numerical-setup/numerical-setup.component';
import {NumericalComponent} from './numerical/numerical.component';

@NgModule({
  declarations: [
    DisplayComponent,
    GaugeComponent,
    NeedleComponent,
    NumericalComponent,
    NumericalSetupComponent,
  ],
  imports: [
    CommonModule,
    ConfigSharedModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    TooltipModule,
  ],
  exports: [DisplayComponent],
})
export class DisplayModule {}
