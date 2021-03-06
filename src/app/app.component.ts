import { ServerService } from './server.service';
import { Component } from '@angular/core';
import { Response } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private service: ServerService){}
  appName=this.service.getappName();
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];
  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  onSend(){
       this.service.storeServers(this.servers)
         .subscribe(
           (response)=> console.log(response),
           (error) => console.log(error)
         )
  }

  onGet(){
    this.service.getServers()
        .subscribe(
          (servers:any[])=> {
            //  console.log(servers);
            this.servers=servers;
            console.log(this.servers);
          },
           (error) => console.log('Error: '+error)
        );
  }
}

