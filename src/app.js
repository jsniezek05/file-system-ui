import {HttpClient} from'aurelia-http-client';

export class App {

  constructor(){
    let client = new HttpClient;
    client.get('http://localhost:3001/')
      .then(data => {
        this.data = JSON.parse(data.response);
      })
  }

  readFile(item){
    this.item = JSON.stringify(item);
    this.type = item.type;
    console.log(this.item);

    if(this.type === 'folder'){
      let client = new HttpClient;
      client.get(`http://localhost:3001/directory/${this.item}`)
        .then(data => {
          this.object = JSON.parse(data.response);
        })
    }
    else{
      let client = new HttpClient;
      client.get(`http://localhost:3001/read/${this.item}`)
        .then(data => {
          this.file = data.response;
        })
    }

  }
}
