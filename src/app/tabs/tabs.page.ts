import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  userRole: string='';


  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userRole = this.authService.getCurrentUser().rol;
    console.log('Rol del usuario en TabsPage:', this.userRole);
  }

}
