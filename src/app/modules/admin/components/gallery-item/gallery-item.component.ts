import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faArrowRightLong,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css'],
})
export class GalleryItemComponent implements OnInit {
  @Input() gallery: any;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  faTrash = faTrashAlt;
  faVisit = faArrowRightLong;

  constructor() {}

  ngOnInit(): void {}

  onDeleteGallery(gallery): void {
    this.onDelete.emit(this.gallery.id);
  }
}
