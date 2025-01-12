import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Member } from './interfaces/member.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  name = 'Angular';
  teamUrl = "https://jsonplaceholder.typicode.com/users";

  counter = 0;
  incrementCounter() {
    this.counter += 1;
  }

  tick = 0;

  ngOnInit() {
    setInterval(() => {
      this.tick += 1;
    },1000);
  }

  members: Member[] = [];
  http= inject(HttpClient);

  sub = this.getData().subscribe(
    m => this.members = m
  );

  members$ = this.getData();

  membersSignal = toSignal(this.getData(), {initialValue:[] });

  getData() {
    return this.http.get<Member[]>(this.teamUrl)
  }
}
