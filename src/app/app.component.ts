import { Component, Input,
  trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import { Resources, Tabs } from './app.data';
var $ = (window as any).$;

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
  newTabName = ''
  newResourceTitle = ""
  newResourceDescription = ""
  newResourceLink = ""


  clicked(tab){
    this.currentTab = tab;
    this.currentResources = Resources[this.currentTab];
  }

  newTab(){
    if (this.newTabName.length > 0) {
      this.tabs.push(this.newTabName); //validation and tab pushed into the array.
    }
    this.newTabName = ""; //sets the input box to blank
  }

  userPressedTabInputKey(event){
    this.newTabName = event.target.value; //saving the tab name 
  
  }

  userPressedResourceInputKey(event) {
     //passing the event and saving variables

    if ($(event.target).hasClass('title')){
      this.newResourceTitle = event.target.value
    } else if ($(event.target).hasClass('link')){
      this.newResourceLink = event.target.value
    } else if ($(event.target).hasClass('description')){
      this.newResourceDescription = event.target.value
    }
    
  }

  addResource(){
    var resource = {
      title : this.newResourceTitle,
      link : this.newResourceLink,
      description : this.newResourceDescription
    }

    console.log(resource);
    console.log(this.currentResources);
    this.currentResources.push(resource);
  }



  openModal(){ 
    $('.modal').modal()
  }



}


