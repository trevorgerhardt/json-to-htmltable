
/**
 * Dependencies
 */

var _ = require('underscore');

/**
 * Expose `json-to-htmltable`
 */

var jsonToHtmlTable = module.exports = function(data, number) {
  if (!data) {
    throw new Error('No data given.');
  }

  // If data is interpreted as a string, attempt to parse it
  if (typeof data == 'string' || data instanceof String) {
    data = JSON.parse(data);
  }

  // if the data doesn't have a length then it is not an array
  if (!data.length) {
    data = [data];
  }

  // The initial table data
  var table = '<table><thead>'
    , keys = [];

  for (var i = 0; i < data.length; i++) {
    keys = _.union(keys, Object.keys(data[i]));
  }

  if (number) {
    table += '<th>#</th>';
  }

  for (var index in keys) {
    table += '<th>' + keys[index] + '</th>';
  }

  table += '</thead><tbody>';

  for (var i = 0; i < data.length; i++) {
    table += '<tr>';
    if (number) {
      table += '<td>' + (i + 1) + '</td>';
    }
    table += objectToTableRow(data[i], keys);
    table += '</tr>';
  }

  return table + '</tbody></table>';
};

/**
 * Convert a data object into a table row
 */

var objectToTableRow = module.exports.objectToTableRow = function(object, keys) {
  var row = '';
  for (var index in keys) {
    var data = object[keys[index]];
    if (_.isObject(data) && !_.isArray(data)) {
      data = jsonToHtmlTable(data, false); 
    }
    row += '<td>' + data + '</td>';
  }
  return row;
};
