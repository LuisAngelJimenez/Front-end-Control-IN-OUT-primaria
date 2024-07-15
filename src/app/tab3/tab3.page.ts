import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  constructor(private storage: Storage) {
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
}

