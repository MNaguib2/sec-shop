import { Component, EventEmitter ,Output} from '@angular/core';
import { DataStorageservice } from '../shared/data-storage.service';


@Component({
    selector: 'Header-app',
    templateUrl: './header.component.html',
    styles: [``]
})
export class HeaderComponent {
    /* this directive not used after commit 8 to work with app-router instead of directive
   @Output() featureSelected = new EventEmitter<string>();
    onSelect(feature: string){
        this.featureSelected.emit(feature);
    }
    //*/
    constructor(private dataStorage: DataStorageservice){}
    onSaveData(){
        this.dataStorage.storageRecipes();
    }
    onFetchRecipe(){
        this.dataStorage.fetchRecipes().subscribe();
    }    
}