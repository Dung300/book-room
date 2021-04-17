import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer'
import { filter } from 'rxjs/operators'
import { Application } from '@nativescript/core'
import {RoomService} from './shared/room.service'
import { AuthService } from './shared/auth.service'


@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  userId;
  user;
  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase

  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private userService:RoomService ,
    private authService: AuthService,


    ) {
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userService.getUser(this.userId).subscribe((user: any) => {
      this.user = user;
    })
    this._activatedUrl = '/home'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects))


  }
  logout(){
    this.authService.logout();
}
  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade',
      },
    })

    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.closeDrawer()
  }
}
