import {
    AbstractControl,
    AsyncValidatorFn,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
  } from '@angular/forms';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';  
  /**
   * Asignar validador en tiempo de ejecución para email
   * @param control
   * @param userService
   */
  export function addAsyncValidatorsEmail(control: FormControl, userService: UserService){
      if(control && control instanceof FormControl){
        control.setAsyncValidators(validateCheckEmailExists(userService))
        control.updateValueAndValidity({onlySelf: true, emitEvent: false})
      }
  }
  
  /**
   * Asignar validador en tiempo de ejecución para Nit
   * @param control
   * @param userService
   */
  export function addAsyncValidatorsNit(control: FormControl, userService: UserService){
      if(control && control instanceof FormControl){
        control.setAsyncValidators(validateCheckNitExists(userService))
        control.updateValueAndValidity({onlySelf: true, emitEvent: false})
      }
  }
  /**
   * Limpiar campos con espacios en blanco
   * @param group
   * @returns
   */
  export function trimAllFormValues(group: FormGroup): FormGroup {
    Object.keys(group.controls).forEach((key) => {
      const control = group.get(key) as FormControl;
      if (control && typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
    return group;
  }
  
  /**
   * Validador para correo
   * @param userService
   * @returns
   */
  export function validateCheckEmailExists(
    userService: UserService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService
        .checkRegisterEmail(control.value)
        .pipe(
          map((user: UserCheck) =>
            Boolean(user.email === control.value)
              ? { validateCheckEmailExists: true }
              : null
          )
        );
    };
  }
  
  /**
   * Validador para nit de empresas
   * @param userService
   * @returns
   */
  export function validateCheckNitExists(
    userService: UserService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService
        .checkRegisterNit(control.value)
        .pipe(
          map((user: UserCheck) =>
            Boolean(user && user.nit === control.value)
              ? { validateCheckNitExists: true }
              : null
          )
        );
    };
  }
  
  /**
   * Validador para confirmar contraseña
   * @param formGroup
   * @returns
   */
  export const ValidateEqualsPassword: ValidatorFn = (formGroup: AbstractControl) : ValidationErrors | null => {
    const password = formGroup.get('password') as FormControl
    const confirmPassword = formGroup.get('confirmPassword') as FormControl
    return password.value === confirmPassword.value ? null : {ValidateEqualsPassword : true}
  }
  
  
  