import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
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


  // Simple property set in an event handler
  // The click handler schedules a change detection cycle
  // So on each click, the counter is correctly displayed
  counter = 0;
  incrementCounter() {
    this.counter += 1;
  }


  //tick = 0;
  tick = signal(0);
  cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    setInterval(() => {
      //this.tick += 1;
      //this.cdr.markForCheck();
      this.tick.update(c => c += 1);
    },1000);
  }

  // Data retrieved from HTTP and stored in an array
  members: Member[] = [];
  http= inject(HttpClient);

  // This does NOT cause change detection
  // The data won't appear until the user clicks the button
  // The click handler schedules a change detection cycle
  sub = this.getData().subscribe(
    m => this.members = m
  );

  // Data retrieved from HTTP with async pipe
  // The async pipe schedules change detection when an
  // item is emitted into the observable
  members$ = this.getData();

  // Data retrieved from HTTP and stored in a signal
  // Provides a notification to all "readers"
  membersSignal = toSignal(this.getData(), {initialValue:[] });

  getData() {
    return this.http.get<Member[]>(this.teamUrl)
  }
}
