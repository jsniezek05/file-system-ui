import {HttpClient} from'aurelia-http-client';

export class App {
  currentFile = {};

  constructor(){
    this.client = new HttpClient;
    this.client.get('http://localhost:3000/children')
      .then(data => {
        this.data = JSON.parse(data.response);
      });
  }
}
