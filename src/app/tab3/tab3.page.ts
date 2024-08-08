import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page {
  currentUser: any;

  constructor(private storage: Storage,private authService: AuthService, private translate:TranslateService) {
    this.initializeApp();
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Datos del usuario logueado:', this.currentUser);
  }

  async initializeApp() {
    await this.storage.create();
    const isDark = await this.storage.get('darkTheme');
    const savedLang= await this.storage.get('selectedLanguage') || 'es';
     this.setTheme(isDark);
     this.translate.setDefaultLang(savedLang);
  }

  changeLanguage(language: string) {
    console.log(`Changing language to: ${language}`);
    this.translate.use(language).subscribe(() => {
      console.log(`Language changed to ${language} successfully.`);
    }, (err) => {
      console.error(`Error changing language: ${err}`);
    });
    this.storage.set('selectedLanguage', language);

    localStorage.setItem('selectedLanguage', language);
    window.location.reload();
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

