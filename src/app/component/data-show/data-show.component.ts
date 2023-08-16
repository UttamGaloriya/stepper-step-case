import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-data-show',
  templateUrl: './data-show.component.html',
  styleUrls: ['./data-show.component.scss']
})
export class DataShowComponent {
  title!: FormControl
  @Input() titleName: string = ''
  ngOnInit() {
    this.title = new FormControl({ value: this.titleName, disabled: true })
  }
}
