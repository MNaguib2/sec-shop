import { Component, EventEmitter ,Output} from '@angular/core';


@Component({
    selector: 'Header-app',
    templateUrl: './header.component.html',
    styles: [``]
})
export class HeaderComponent {
   @Output() featureSelected = new EventEmitter<string>();
    onSelect(feature: string){
        this.featureSelected.emit(feature);
    }
}