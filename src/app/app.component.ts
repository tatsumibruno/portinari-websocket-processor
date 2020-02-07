import { Component } from '@angular/core';
import { WebSocketConnector } from 'src/websocket/websocket-connector';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: any[] = [];
  private webSocketConnector: WebSocketConnector;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.webSocketConnector = new WebSocketConnector(
      'http://localhost:8080/socket',
      '/statusProcessor',
      this.onMessage.bind(this)
    );
  }

  start() {
    this.http.put('http://localhost:8080/api', {})
      .subscribe(response => console.log(response));
  }

  onMessage(message: any): void {
    this.items.push(message.body);
  }


}
