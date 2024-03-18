import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgIf } from '@angular/common';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-real-time-stats',
  standalone: true,
  imports: [MapComponent,SidebarComponent,ContainerComponent, NgIf],
  templateUrl: './real-time-stats.component.html',
  styleUrl: './real-time-stats.component.css'
})
export class RealTimeStatsComponent {

   showSidebar = false;

     addItem(newItem: string) {
    console.log(newItem);


    this.showSidebar = !this.showSidebar ;
    
    
  }

}
