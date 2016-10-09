import {HttpClient} from'aurelia-http-client';
import {bindable, inject} from 'aurelia-framework';
import {CodeMirrorService} from '../../code-mirror';

@inject(CodeMirrorService)
export class FileBrowser {
	@bindable data;
	@bindable currentFile;

  constructor(codeMirrorService) {
    this.client = new HttpClient;
    this.codeMirrorService = codeMirrorService;
  }

  getChildren(item) {
  	if(item.open) { return item.open = false; }
  	item.open = true;
    this.client.get('http://localhost:3000/children?path=' + item.fullPath)
      .then(data => JSON.parse(data.response))
      .then(data => {
        if(data.content) {
          this.currentFile.content = data.content;
          this.cm = this.codeMirrorService.getInstance();
          this.cm.setValue(this.currentFile.content);
        } else {
          item.children = data;
        }
      });
  }
}