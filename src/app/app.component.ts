import { Component } from '@angular/core';
import { Resources } from './app.data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'app works!';
  tabs = ["tab1", "tab2", "tab3"]
  currentTab = this.tabs[0];
  currentResources = Resources[this.currentTab]; //making sure the resources come under the right tabName
  


  clicked(tab){
    this.currentTab = tab;
    this.currentResources = Resources[this.currentTab];
  }

  

  



 





}


