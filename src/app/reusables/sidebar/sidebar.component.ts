import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/commons/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  width: number = 200;
  user!: any;

  constructor(private router: Router, private elementRef: ElementRef) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {

    if (window.innerWidth <= 1080) {
      this.width = 0;
    } else {
      this.width = 200;
    }
  }

  ngOnInit(): void {
    this.onResize();

    this.elementRef.nativeElement.ownerDocument.querySelector('#menu-toggle')
      .addEventListener("click", () => {
        this.width = this.width === 0 ? 200 : 0;
        let navbarBtn: HTMLElement = this.elementRef.nativeElement.ownerDocument.querySelector('#menu-toggle');

        if (window.innerWidth <= 1080 && this.width == 200) {
          navbarBtn.style.marginLeft = "200px";
        } else if (window.innerWidth <= 1080 && this.width == 0) {
          navbarBtn.style.marginLeft = "0px";
        }
      });
  

  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['login']);
  }
}
