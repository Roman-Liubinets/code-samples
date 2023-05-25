import { FormGroup } from "@angular/forms";

export class HelperService {
  constructor() {}

  public static markAllAsTouched(form: FormGroup): void {
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        form.controls[key].markAllAsTouched();
        form.controls[key].markAsDirty();
      }
    }
  }
}
