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

  var App = exports.App = function () {
    function App() {
      var _this = this;

      _classCallCheck(this, App);

      var client = new _aureliaHttpClient.HttpClient();
      client.get('http://localhost:3001/').then(function (data) {
        _this.data = JSON.parse(data.response);
      });
    }

    App.prototype.readFile = function readFile(item) {
      var _this2 = this;

      this.item = JSON.stringify(item);
      this.type = item.type;
      console.log(this.item);

      if (this.type === 'directory') {
        var client = new _aureliaHttpClient.HttpClient();
        client.get('http://localhost:3001/directory/' + this.item).then(function (data) {
          _this2.object = JSON.parse(data.response);
        });
      } else {
        var _client = new _aureliaHttpClient.HttpClient();
        _client.get('http://localhost:3001/read/' + this.item).then(function (data) {
          _this2.file = data.response;
        });
      }
    };

    return App;
  }();
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./style.css\"></require>\n\n  <div class=\"dir\">\n    <ul>\n      <li repeat.for=\"item of data\">\n        <a click.trigger=\"readFile(item)\">\n          ${item.name}, ${item.type}, ${item.bc}\n        </a>\n      </li>\n    </ul>\n  </div>\n  <div class=\"dir2\">\n    <ul>\n      <li repeat.for=\"item of object\">\n        <a click.trigger=\"readFile(item)\">\n          ${item.name}, ${item.type}, ${item.bc}\n        </a>\n      </li>\n    </ul>\n  </div>\n  <div class=\"file\">\n    ${file}\n  </div>\n\n</template>\n"; });
define('text!style.css', ['module'], function(module) { module.exports = "body {\n  margin: 0;\n  padding: 0;\n  display: flex;\n}\nbody .dir {\n  height: 100vh;\n  width: 300px;\n  background-color: #808080;\n  overflow: scroll;\n  border: 1px solid #000;\n}\nbody .dir2 {\n  height: 100vh;\n  width: 300px;\n  background-color: #808080;\n  overflow: scroll;\n  border: 1px solid #000;\n}\nbody .file {\n  height: 100vh;\n  width: 300px;\n  background-color: #808080;\n  overflow: scroll;\n  border: 1px solid #000;\n}\nbody ul {\n  list-style: none;\n  padding-left: 0;\n}\n"; });
//# sourceMappingURL=app-bundle.js.map