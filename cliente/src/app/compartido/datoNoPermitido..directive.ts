import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function forDatoVacioValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appDatoVacio]',
  providers: [{provide: NG_VALIDATORS, useExisting: DatoVacioDirective, multi: true}]
})
export class DatoVacioDirective {
  @Input('appForbiddenName') forbiddenName = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenName ? forDatoVacioValidator(new RegExp(this.forbiddenName, 'i'))
    (control): null;
  }
  constructor() { }


}
