import {FormGroup, FormControl} from '@angular/forms';

export class FormService {

  constructor(private formGroup: FormGroup, private additionalFormInfo: any) {
  }

  markFormGroup(markAs: string, formGroup?: FormGroup) {
    const form = formGroup || this.formGroup;
    if (form.controls) {
      const keys = Object.keys(form.controls);
      for (let i = 0; i < keys.length; i++) {
        const control = form.controls[keys[i]];

        if (control instanceof FormControl) {
          control[`markAs${markAs}`]();
        } else if (control instanceof FormGroup) {
          this.markFormGroup(markAs, control);
        }
      }
    }
  }

  markFormGroupTouched(formGroup?: FormGroup) {
    this.markFormGroup('Touched', formGroup);
  }

  get f() {
    return this.formGroup.controls;
  }

  checkValidity(field) {
    return (this.additionalFormInfo.submitted || this.f[field].touched) && this.f[field].invalid;
  }

  populateErrorForms(errors) {
    Object.keys(errors)
      .forEach(error => {
        this.f[error].setErrors(
          errors[error].reduce((accum, validation) => {
            return {
              ...accum,
              [validation]: true
            };
          }, {}));
      });
  }

  manageErrors(response) {
    if (response.status === 422) {
      this.populateErrorForms(response.error);
    }
    this.additionalFormInfo.submitted = false;
  }
}
