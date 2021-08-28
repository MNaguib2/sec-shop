import { Component, EventEmitter ,OnDestroy,Output} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageservice } from '../shared/data-storage.service';


@Component({
    selector: 'Header-app',
    templateUrl: './header.component.html',
    styles: [``]
})
export class HeaderComponent implements OnDestroy {
    /* this directive not used after commit 8 to work with app-router instead of directive
   @Output() featureSelected = new EventEmitter<string>();
    onSelect(feature: string){
        this.featureSelected.emit(feature);
    }
    //*/
    userSub !: Subscription;
    isAuthenticated = false;
    clickFetch = false;

     constructor(private dataStorage: DataStorageservice, private userAuth : AuthService){
      this.userSub = this.userAuth.user.subscribe(User => {
        this.isAuthenticated = !!User;
      })
    }
    onSaveData(){
        this.dataStorage.storageRecipes();
    }
    onFetchRecipe(){
      this.clickFetch = !this.clickFetch;
        this.dataStorage.fetchRecipes().subscribe();
    }
    ngOnDestroy(){
      this.userSub.unsubscribe();
    }
    onLogout() {
      this.userAuth.logout();
    }
}
