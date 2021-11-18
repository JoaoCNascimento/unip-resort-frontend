import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './services/api/auth.service';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService,
    public authService: AuthService
    ) {

  }

  ngOnInit() {

  }

}
