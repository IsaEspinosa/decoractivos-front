import {FormGroup, FormControl} from "@angular/forms";

export class FormService {

  constructor(private formGroup: FormGroup, private additionalFormInfo: any) {
  }

  markFormGroupTouched(formGroup?: FormGroup) {
    const form = formGroup || this.formGroup
    if (form.controls) {
      const keys = Object.keys(form.controls);
      for (let i = 0; i < keys.length; i++) {
        const control = form.controls[keys[i]];

        if (control instanceof FormControl) {
          control.markAsTouched();
        } else if (control instanceof FormGroup) {
          this.markFormGroupTouched(control);
        }
      }
    }
  }

  get f() {
    return this.formGroup.controls;
  }


  checkValidity(field) {
    return (this.additionalFormInfo.submitted || this.f[field].touched) && this.f[field].invalid
  }
}
