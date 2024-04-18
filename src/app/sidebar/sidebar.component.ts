import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimePipe } from '../time.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TimePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public status:any;

  ngOnInit(): void {
    
      console.log(this.car);
      
    
  }
  
  // new event emiter
  @Output() close = new EventEmitter<void>();

  // make a car input
  @Input() car: any = {};

  isOpen: boolean = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  
  onClose() {
    this.isOpen = false;
    this.close.emit();


  }

}
