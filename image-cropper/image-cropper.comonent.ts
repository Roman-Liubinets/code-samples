import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { ImageCroppedEvent, ImageCropperComponent } from "ngx-image-cropper";

@Component({
  selector: "app-cropper",
  templateUrl: "./cropper.component.html",
  styleUrls: ["./cropper.component.scss"],
})
export class CropperComponent implements OnInit {
  public cropperData: any;
  public imageType: string;
  public imageChangedEvent: Event = null;
  public base64Image: string;
  @ViewChild("imageCropper", { static: false })
  imageCropper: ImageCropperComponent;
  public cropperConfiguration: { aspectRatio: number; roundCropper: boolean };
  public finalCrop: boolean;

  constructor(
    public dialogRef: MatDialogRef<CropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notifier: MatSnackBar
  ) {
    this.imageChangedEvent = data.event;
    this.cropperData = data;
    if ((data.event.target.files[0].size * 0.000001) % 10 > 5) {
      this.notifier.open(
        "The image is too big. Please upload image up to 5 Mb"
      );
      this.dialogRef.close();
    }
    if (data.event && data.event.target && data.event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (result: any) => {
        this.base64Image = result.target.result;
      };
      reader.readAsDataURL(data.event.target.files[0]);
    }
    if (data.isMobile) {
      this.cropperConfiguration = { aspectRatio: 4 / 2, roundCropper: false };
    } else if (data.isQuestions) {
      this.cropperConfiguration = { aspectRatio: 2 / 4, roundCropper: false };
    } else {
      this.cropperConfiguration = { aspectRatio: 1, roundCropper: true };
    }
  }

  ngOnInit(): void {
    this.imageType = this.cropperData.event.target.files[0].type;
    this.imageType = this.imageType.substring(
      this.imageType.indexOf("image/" + 6)
    );
  }

  public crop() {
    this.finalCrop = true;
    this.imageCropper.crop();
  }

  public imageCropped(event: ImageCroppedEvent) {
    const reader = new FileReader();
    reader.readAsDataURL(event.file);
    reader.onload = (result: any) => {
      if (this.finalCrop) {
        this.dialogRef.close(result.target.result);
      }
    };
  }
}
