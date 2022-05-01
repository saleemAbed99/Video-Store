import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faArrowRightLong,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.css'],
})
export class VideoItemComponent implements OnInit {
  @Input() video: any;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  faTrash = faTrashAlt;
  faVisit = faArrowRightLong;

  ngOnInit(): void {
    console.log('video: ', this.video);
  }

  createVideoPath(serverPath: string) {
    return `https://localhost:5001/${serverPath}`;
  }

  onDeleteVideo(video): void {
    this.onDelete.emit(this.video.id);
  }
}
