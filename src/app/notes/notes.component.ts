import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from './notes.service';
declare var $: any;
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  titles: any = [];
  noteForm: any = new FormGroup({});
  selectedItem: any = null;

  constructor(public _noteService: NotesService, public _fb: FormBuilder) {}

  ngOnInit(): void {
    this.createNote();
    this.getTitles();
  }

  // form Creation
  createNote() {
    this.noteForm = this._fb.group({
      title: ['', Validators.required],
    });
    this.selectedItem = null;
  }

// Get titles form fake data api 
  getTitles() {
    this._noteService.getTitles().subscribe((response: any) => {
      this.titles = response;
      console.log(response);
    });
  }

  // Click on button Add and Update icon
  clickAddUpdate(item?: any, i?: any) {
    this.createNote();

    if (item) {
      this.selectedItem = item;
      this.selectedItem['i'] = i;
      this.noteForm.patchValue({
        title: item.title,
      });
    }
    $('#addUpdate').modal('show');
  }

  // Click On add/update  button in model 
  clickToAddUpdate() {
    const Body = this.noteForm.value;
    if (!this.selectedItem) {
      /*  Add API */
      this._noteService
        .addTitle(JSON.stringify(Body))
        .subscribe((response: any) => {
          console.log(response);
          this.titles.splice(0, 0, { id: 101, title: Body.title });
          $('#addUpdate').modal('hide');

        });
    } else {
      /* Update API */
      this._noteService
        .UpdateTitle(JSON.stringify(Body), this.selectedItem.id)
        .subscribe((response: any) => {
          console.log(response);
          this.titles[this.selectedItem.i].title = Body.title;
          $('#addUpdate').modal('hide');

          // this.getTitles();
        });
    }
  }

  /* Delete APi */
  deleteItem(item: any, i: any) {
    this._noteService.deleteTitle(item.id).subscribe((response: any) => {
      console.log(response);
      this.titles.splice(i, 1);
      $('#addUpdate').modal('hide');
    });
  }
}
