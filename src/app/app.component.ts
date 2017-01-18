import { Component, Input,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes } from '@angular/core';

// import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import { DataService } from './data.service';
declare var firebase: any;

var $ = (window as any).$; //letting jquery be used in the application, typescript throwing errors

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService],
  animations: [

      trigger('focusPanel', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
       trigger('movePanel', [
            
            transition('void => *', [
                animate(600, keyframes([
                    style({opacity: 0, transform: 'translateY(-100px)', offset: 0}),
                    style({opacity: 1, transform: 'translateY(25px)', offset: .75}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 1}),
                ]))
            ])
            

        ]),
         trigger('moveTab', [
            
            transition('void => *', [
                animate(800, keyframes([
                    style({opacity: 0}),
                    style({opacity: 0.5}),
                    style({opacity: 1}),
                ]))
            ])
            

        ])
        



    ]
})
export class AppComponent {
  
  resources:any = {};
  title = 'app works!';
  tabs = [];
  currentTab = this.tabs[0];
  currentResources = this.resources[this.currentTab]; //making sure the resources come under the right tabName
  newTabName = '';
  newResourceTitle = "";
  newResourceDescription = "";
  newResourceLink = "";
  newResourceAuthor = "";
  
  state: string = 'inactive';
  currentEditedResource = {title : "", link: "", description: ""};
  // RemoteResource: FirebaseObjectObservable<any>;
  
  
  constructor(private dataService: DataService) { //creating a dataService to refer to DataService
    // af: AngularFire was above in constructor.
    // console.log(af);
    // this.RemoteResource = af.database.object("/Resources");
    // this.RemoteResource.subscribe(() => console.log("resources have loaded"));
    
  }

  //FIREBASE METHODS
  ngOnInit(){
    //  this.dataService.fetchData().subscribe(data => {
    //         this.resources = data;
    //         debugger;  
    //         this.currentResources = this.resources[this.currentTab];
    // });

    this.fbGetData();
  }

  fbGetData(){
    firebase.database().ref('/').once('child_added', (snapshot) => {
      debugger;
      this.resources = (snapshot.val());
      this.tabs = (Object.keys(this.resources)); //getting tabs into an array

      this.currentTab = this.tabs[0]; // 
      // this.currentResources = this.resources[this.currentTab];
    })
  }
  
  

  clicked(tab){
    this.currentTab = tab;
    this.currentResources = this.resources[this.currentTab];
  }

  newTab(){
    if (this.newTabName.length > 0) {
      this.tabs.push(this.newTabName);
      this.resources[this.newTabName] = []; // syntax for setting and getting a key is similar in hashs
      this.clicked(this.newTabName); // calling clicked function to set tab
       //validation and tab pushed into the array.
       
      this.saveResourcesToFirebase();

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
    } else if ($(event.target).hasClass('author')){
      this.newResourceAuthor = event.target.value
    }
    
  }

  addResource(){
    var resource = {
      title : this.newResourceTitle,
      link : this.newResourceLink,
      description : this.newResourceDescription,
      time: new Date().toLocaleString(),
      author: this.newResourceAuthor
    }

    console.log(resource);
    console.log(this.currentResources);
    this.currentResources.push(resource);
    
    this.saveResourcesToFirebase();

    this.newResourceTitle = "";
    this.newResourceLink = "";
    this.newResourceDescription = ""; // make sure resources default to nothing once added.
  }

  saveResourcesToFirebase(){
    firebase.database().ref('/resources').update(this.resources);
   
  }



  openModal(){ 
    $('.modal').modal()
    
  }

  toggleResource(){
   this.state = (this.state === 'inactive' ? 'active' : 'inactive');
  }

  clickedEdit(resource){
    this.openModal()
    this.currentEditedResource = resource;


  }

}


