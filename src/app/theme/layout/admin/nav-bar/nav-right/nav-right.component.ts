// Angular import
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

// third party import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-right',
  imports: [RouterModule, SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {

  constructor(
    private authService: AuthService,
    private utilService: UtilsService
  ) {}

  doLogout() {
    console.log("Logging Out");
    
    this.authService.logout()
    this.utilService.redirect_page_to('/guest/login')
  }
}
