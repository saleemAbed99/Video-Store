import { Component, Input, OnInit } from '@angular/core';
import {
  faArrowRightLong,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ugallery-item',
  templateUrl: './ugallery-item.component.html',
  styleUrls: ['./ugallery-item.component.css'],
})
export class UGalleryItemComponent implements OnInit {
  @Input() gallery: any;
  faVisit = faArrowRightLong;

  constructor() {}

  ngOnInit(): void {}
}
