import { Component, OnInit } from '@angular/core';
import { faBed, faClock, faEnvelope, faGamepad, faMapMarkerAlt, faPhone, faPlus, faSwimmingPool, faWifi } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // FontAwesomeIcons
  //// section 
  faBed = faBed
  faPool = faSwimmingPool
  faWifi = faWifi
  faGamepad = faGamepad
  faClock = faClock
  faPlus = faPlus
  //// footer
  faPhone = faPhone
  faMark = faMapMarkerAlt
  faEnvelope = faEnvelope


  constructor() { }

  ngOnInit(): void {
  }

}
