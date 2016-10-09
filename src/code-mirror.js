export class CodeMirrorService {
	getInstance() {
		this.instance = this.instance || CodeMirror(document.getElementById('code'), {
            lineNumbers: true
        });
        return this.instance;
	}
}