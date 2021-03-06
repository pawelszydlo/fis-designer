import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {NumericalConfig, NumericalConfigFieldsType} from '../../models/configs';
import {NUMERICAL_FIELD_METADATA} from '../../models/configs_metadata';
import {changedNumericalConfig} from '../../state/config.actions';
import {ConfigStateNumericalFieldsType} from '../../state/config.state';

@Component({
  selector: 'app-numerical',
  templateUrl: './numerical.component.html',
  styleUrls: ['./numerical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumericalComponent {
  @Input() numericalConfig?: NumericalConfig;
  // Name of the state field this config corresponds to.
  @Input() fieldName?: ConfigStateNumericalFieldsType;
  @Input() label = '';

  NUMERICAL_FIELD_METADATA = NUMERICAL_FIELD_METADATA;

  constructor(private readonly store: Store) {}

  valueChanged(value: number | boolean, fieldName: NumericalConfigFieldsType) {
    if (this.numericalConfig && this.fieldName) {
      this.store.dispatch(
        changedNumericalConfig({
          config: {...this.numericalConfig, [fieldName]: value},
          displayConfigField: this.fieldName,
        })
      );
    }
  }
}
