import { Component, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";

import { ElementMaterialsEnum } from "../shared/enums";
import { IElementMaterial } from "../shared/interfaces";
import { HelperService } from "../shared/helpers";

@Component({
  selector: "app-add-link",
  templateUrl: "./add-link.component.html",
  styleUrls: ["./add-link.component.scss"],
})
export class AddLinkComponent {
  public addLinkForm: FormGroup;
  public typesLink = [
    { name: "Video", id: ElementMaterialsEnum.video },
    { name: "Document", id: ElementMaterialsEnum.doc },
    { name: "Elearning", id: ElementMaterialsEnum.elearning },
  ];
  public isNew: boolean;
  public materialsEnum: typeof ElementMaterialsEnum;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) {
    this.isNew = this.data.isNew;
    this.materialsEnum = ElementMaterialsEnum;
    this.buildForm();
    if (data.previousData) {
      this.addLinkForm.patchValue({
        ...data.previousData,
        linkType: data.previousData.type.toString(),
      });
    }
    if (!data || !data.isLibray) {
      this.typesLink.push({
        name: "MoodleCourse",
        id: ElementMaterialsEnum.moodleCourse,
      });
      this.typesLink.push({
        name: "TALENT_LMS",
        id: ElementMaterialsEnum.talentLMS,
      });
    }
  }

  private buildForm(): void {
    this.addLinkForm = this.formBuilder.group({
      linkType: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      link: new FormControl("", [Validators.required]),
    });
  }

  public send(): void {
    HelperService.markAllAsTouched(this.addLinkForm);
    if (this.addLinkForm.invalid) {
      return;
    } else {
      this.dialogRef.close({
        ...this.addLinkForm.value,
        type: +this.addLinkForm.value["linkType"],
        id: this.data.previousData ? this.data.previousData.id : undefined,
      } as IElementMaterial);
    }
  }

  public close(): void {
    this.dialog.closeAll();
  }

  public hasError(controlName: string, errorName: string): boolean {
    return (
      this.addLinkForm.controls.hasOwnProperty(controlName) &&
      this.addLinkForm.controls[controlName].hasError(errorName)
    );
  }
}
