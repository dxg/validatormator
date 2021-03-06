// Generated by CoffeeScript 1.7.1
(function() {
  var adheresToSchemas, v;

  adheresToSchemas = function(obj, theSchemas) {
    var JsonSchema, aSchema, e, idx, res, validator, _i, _len;
    if (theSchemas == null) {
      theSchemas = [];
    }
    if (!(theSchemas.length && (theSchemas.forEach != null))) {
      return true;
    }
    JsonSchema = require('jsonschema');
    validator = new JsonSchema.Validator;
    for (idx = _i = 0, _len = theSchemas.length; _i < _len; idx = ++_i) {
      aSchema = theSchemas[idx];
      if (typeof aSchema === 'string') {
        try {
          aSchema = JSON.parse(aSchema);
        } catch (_error) {
          e = _error;
          return false;
        }
      }
      validator.addSchema(aSchema, "schema-" + idx);
      res = validator.validate(obj, aSchema);
      if (!res.valid) {
        return false;
      }
    }
    return true;
  };

  module.exports = v = {
    JSONSync: function(json, opts) {
      var e, obj;
      if (opts == null) {
        opts = {};
      }
      if (opts.allowNull === false && (json == null)) {
        return false;
      }
      obj = null;
      try {
        obj = JSON.parse(json);
        if (opts.mustBeObject) {
          return typeof obj === 'object';
        }
        if (opts.schemas) {
          return adheresToSchemas(obj, opts.schemas);
        }
        return true;
      } catch (_error) {
        e = _error;
        return false;
      }
    },
    JSON: function(msg, opts) {
      if (msg == null) {
        msg = "Invalid JSON string specified";
      }
      return function(json, cb) {
        if (typeof opts === 'function' && (cb == null)) {
          cb = opts;
          opts = {};
        }
        if (!v.JSONSync(json, opts)) {
          return cb(msg);
        }
        return cb();
      };
    }
  };

}).call(this);
