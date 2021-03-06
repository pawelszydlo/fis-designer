import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, withLatestFrom} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {containsAllDigitImages} from '../../image-manager/utils';
import {SnackBarService} from '../../services/snack-bar.service';
import {
  changedGeneralFieldsConfig,
  changedNeedleConfig,
  recalculateDigitsSize,
  recalculateNeedleSize,
} from './config.actions';
import {Store} from '@ngrx/store';
import {selectGeneralFieldsConfig, selectNeedleConfigs} from './config.selectors';
import {selectAllImages, selectLoadedImageNames} from '../../preview/state/preview.selectors';

@Injectable()
export class ConfigEffects {
  debug = createEffect(
    () =>
      this.actions$.pipe(
        filter(() => !environment.production),
        tap(action => console.log(`ACTION: ${action.type}`, action))
      ),
    {dispatch: false}
  );

  /** Effect to recalculate needle dimensions based on needle image. */
  recalculateNeedle = createEffect(() =>
    this.actions$.pipe(
      ofType(recalculateNeedleSize),
      withLatestFrom(this.store.select(selectNeedleConfigs)),
      withLatestFrom(this.store.select(selectAllImages)),
      concatMap(([[action, needleConfigs], allImages]) => {
        const image = allImages[action.previewStateImageField];
        const config = needleConfigs[action.configStateNeedleField];
        if (!image || !config) return [];
        return [
          changedNeedleConfig({
            config: {
              ...config,
              width: image.naturalWidth,
              height: image.naturalHeight,
            },
            displayConfigField: action.configStateNeedleField,
          }),
        ];
      })
    )
  );

  /** Effect to recalculate digit font dimensions based on loaded images. */
  recalculateDigitsSize = createEffect(() =>
    this.actions$.pipe(
      ofType(recalculateDigitsSize),
      withLatestFrom(this.store.select(selectGeneralFieldsConfig)),
      withLatestFrom(this.store.select(selectAllImages)),
      withLatestFrom(this.store.select(selectLoadedImageNames)),
      concatMap(([[[action, generalConfig], allImages], loadedImageNames]) => {
        if (!containsAllDigitImages(new Set(loadedImageNames))) {
          this.snackBar.error('Not all digit images are loaded yet.');
        }
        const fontWidth = allImages.digit0!.naturalWidth;
        const fontHeight = allImages.digit0!.naturalHeight;
        const dotWidth = allImages.digitDot!.naturalWidth;
        return [
          changedGeneralFieldsConfig({
            config: {
              ...generalConfig,
              fontWidth: fontWidth,
              fontHeight: fontHeight,
              fontDotWidth: dotWidth,
            },
          }),
        ];
      })
    )
  );

  constructor(
    private actions$: Actions,
    private readonly snackBar: SnackBarService,
    private readonly store: Store
  ) {}
}
