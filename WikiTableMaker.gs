/**
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org/>
 */

/**
 * WikiTableMaker.gs
 * Designed for Google Drive Spreadsheeets.
 * Converts Spreadsheet range of selected values into wikitable described here:
 *   http://simple.wikipedia.org/wiki/Wikipedia:Wikitable
 *
 * @license The Unlicense http://unlicense.org/
 * @version 0.3
 * @updated 2015-03-12
 * @author  The Pffy Authors https://github.com/pffy/
 * @link    https://github.com/pffy/googlescript-wikitable
 *
 */
var WikiTableMaker = function (range) {

  // parts
  var _rows = 0,
      _cols = 0,
      _CRLF = '\r\n',
      _emptyRange = true;

  // templates
  var _startTable = '{| class=wikitable',
      _endTable = '|}',
      _newCellDelimiter = ' || ',
      _newRowDelimiter = '|-'  + _CRLF + '| ',
      _emptyTable = _startTable + ' | ' + _endTable;

  // input-output
  var _wikiMarkup = '',
      _range = {};


  // set Range, then convert
  _range = (typeof range == 'object') ? _range = range : {};
  range = null;

  _convert();

  // converts Range object into wikitable markup string
  function _convert() {

    // if empty, do not convert
    if(Object.keys(_range).length < 1) {
      _wikiMarkup = _emptyTable;
      return false;
    }

    var output = '';

    _emptyRange = false;

    _rows = _range.getNumRows();
    _cols = _range.getNumColumns();

    output += _startTable + _CRLF + _newRowDelimiter;

    for (var i = 1; i <= _rows; i++) {

      // each cell
      for (var j = 1; j <= _cols; j++) {

        if(j < _cols) {
          output += _range.getCell(i,j).getValue()
            + _newCellDelimiter;
        } else {
          output += _range.getCell(i,j).getValue();
        }

      }

      // start new row OR end table
      if(i < _rows) {
        output += _CRLF + _newRowDelimiter;
      } else {
        output += _CRLF + _endTable;
      }
    }

    _wikiMarkup = output;
  }

  return {

    /**
     * Returns the string representation of this object.
     * @return string text
     */
    toString: function() {
      return this.getWikiMarkup();
    },

    /**
     * Returns wikitable markup text string.
     * @return string text
     */
    getWikiMarkup: function() {
      return _wikiMarkup;
    },

    /**
     * Returns spreadsheet Range of values.
     * @return Range
     */
    getRange: function() {
      return _range;
    },

    /**
     * Sets spreadsheet Range of values.
     * @return this object
     */
    setRange: function(range) {
      _range = (typeof range === 'object') ? _range = range : {};
      _convert();
      return this;
    },

    /**
     * Returns true if spreadsheet range is empty; false, otherwise.
     * @return boolean value
     */
    isRangeEmpty: function() {
      return _emptyRange;
    }

  };
};
