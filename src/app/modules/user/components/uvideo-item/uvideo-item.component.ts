import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightLong, faHeart } from '@fortawesome/free-solid-svg-icons';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-uvideo-item',
  templateUrl: './uvideo-item.component.html',
  styleUrls: ['./uvideo-item.component.css'],
})
export class UVideoItemComponent implements OnInit {
  @Input() video: any;
  @Input() isFav = false;
  @Output() onRemoveFromFav: EventEmitter<any> = new EventEmitter();
  @Output() onAddToFav: EventEmitter<any> = new EventEmitter();

  faAddColor;

  faAdd = faHeart;
  faVisit = faArrowRightLong;

  constructor(private videoServices: VideoService, private router: Router) {}

  ngOnInit(): void {
    if (this.isFav) {
      this.faAddColor = 'red';
    } else {
      this.faAddColor = 'white';
    }
  }

  createVideoPath(serverPath: string) {
    return `https://localhost:5001/${serverPath}`;
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }

  onRemoveFromFavorite(video): void {
    this.onRemoveFromFav.emit(this.video.id);
  }

  onAddToFavorite(video): void {
    this.onAddToFav.emit(this.video.id);
  }

  onToggleVideo(id): void {
    this.isFav = !this.isFav;

    let body = {
      videoId: id,
    };

    if (this.isFav) {
      this.videoServices.AddToFavorite(body).subscribe((res) => {
        this.faAddColor = 'red';
      });
    } else {
      this.onRemoveFromFavorite(body);
      this.faAddColor = 'white';
    }
  }
}
