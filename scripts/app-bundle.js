define('app',['exports', 'aurelia-http-client'], function (exports, _aureliaHttpClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    var _this = this;

    _classCallCheck(this, App);

    this.currentFile = {};

    this.client = new _aureliaHttpClient.HttpClient();
    this.client.get('http://localhost:3000/children').then(function (data) {
      _this.data = JSON.parse(data.response);
    });
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/elements/file-browser',['exports', 'aurelia-http-client', 'aurelia-framework', '../../code-mirror'], function (exports, _aureliaHttpClient, _aureliaFramework, _codeMirror) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FileBrowser = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var FileBrowser = exports.FileBrowser = (_dec = (0, _aureliaFramework.inject)(_codeMirror.CodeMirrorService), _dec(_class = (_class2 = function () {
    function FileBrowser(codeMirrorService) {
      _classCallCheck(this, FileBrowser);

      _initDefineProp(this, 'data', _descriptor, this);

      _initDefineProp(this, 'currentFile', _descriptor2, this);

      this.client = new _aureliaHttpClient.HttpClient();
      this.codeMirrorService = codeMirrorService;
    }

    FileBrowser.prototype.getChildren = function getChildren(item) {
      var _this = this;

      if (item.open) {
        return item.open = false;
      }
      item.open = true;
      this.client.get('http://localhost:3000/children?path=' + item.fullPath).then(function (data) {
        return JSON.parse(data.response);
      }).then(function (data) {
        if (data.content) {
          _this.currentFile.content = data.content;
          _this.cm = _this.codeMirrorService.getInstance();
          _this.cm.setValue(_this.currentFile.content);
        } else {
          item.children = data;
        }
      });
    };

    return FileBrowser;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'data', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'currentFile', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('code-mirror',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CodeMirrorService = exports.CodeMirrorService = function () {
    function CodeMirrorService() {
      _classCallCheck(this, CodeMirrorService);
    }

    CodeMirrorService.prototype.getInstance = function getInstance() {
      this.instance = this.instance || CodeMirror(document.getElementById('code'), {
        lineNumbers: true
      });
      return this.instance;
    };

    return CodeMirrorService;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./style.css\"></require>\n  <require from=\"./resources/elements/file-browser\"></require>\n  <h3>Directory</h3>\n  <div class=\"dir\">\n    <file-browser data.bind=\"data\" current-file.bind=\"currentFile\"></file-browser>\n    <div id=\"code\"></div>\n    <div class=\"content-area\" if.bind=\"false\">\n      ${currentFile.content}\n    </div>\n  </div>\n</template>\n"; });
define('text!style.css', ['module'], function(module) { module.exports = "body {\n  margin: 0;\n  padding: 0;\n}\n.dir {\n  display: flex;\n}\n.dir file-browser {\n  width: 200px;\n}\n"; });
define('text!resources/elements/file-browser.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"./file-browser\"></require>\n\t<ul>\n      <li repeat.for=\"item of data\">\n        <a href=\"\" click.trigger=\"getChildren(item)\">\n          ${item.name}\n        </a>\n\t\t<file-browser show.bind=\"item.open\" data.bind=\"item.children\" current-file.bind=\"currentFile\"></file-browser>\n      </li>\n    </ul>   \n</template>"; });
//# sourceMappingURL=app-bundle.js.map