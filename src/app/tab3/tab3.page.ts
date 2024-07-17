import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  constructor(private storage: Storage,private authService: AuthService) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.storage.create();
    const isDark = await this.storage.get('darkTheme');
    this.setTheme(isDark);
  }

  toggleTheme(event: any) {
    const isDark = event.detail.checked;
    this.setTheme(isDark);
    this.storage.set('darkTheme', isDark);
  }

  setTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
  }

  logout() {
    this.authService.logout();
  }

}

