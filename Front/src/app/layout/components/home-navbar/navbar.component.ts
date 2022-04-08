import { Component, OnInit } from '@angular/core';
import { User } from '../../../auth/models/user';
import { AuthenticationService } from '../../../auth/service/authentication.service';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import {NotificationType} from "../../../enum/notification-type.enum";
import {Role} from "../../../enum/role.enum";
import {NotificationService} from "../../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  username: string;
  user: User;
  title = 'cinema-app';
  display = false;
  authentication: AuthenticationService;
  constructor(private notificationService: NotificationService,
              public authService: AuthenticationService,
              private router: Router,
              private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isAuthenticated();
    this.username = this.authService.getUserName();
  }
  logout() {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.router.navigate(['/homepage']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  isUserLoggedIn(){
    this.eventEmitterService.onFirstComponentButtonClick();
  }
  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }
  private getUserRole(): string {
    return this.authService.getUserFromLocalCache().role;
  }
  onPress() {
    this.display = true;
    /*if you want the component to show and hide on click pressed, use
    use this line
    this.display = !this.display;*/
  }
}
