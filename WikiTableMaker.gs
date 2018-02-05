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
var WikiTableMaker = function (range) 
{

  // parts
  var _rows = 0,
      _cols = 0,
      _CRLF = '\r\n',
      _emptyRange = true;

  // templates
  var _startTable = '{| class=wikitable',
      _endTable = '|}',
      _emptyTable = _startTable + ' | ' + _endTable;

  // input-output
  var _wikiMarkup = '',
      _range = {};


  // set Range, then convert
  _range = (typeof range == 'object') ? _range = range : {};
  range = null;

  _convert();

  // converts Range object into wikitable markup string
  function _convert() 
  {
    // if empty, do not convert
    if(Object.keys(_range).length < 1) 
    {
      _wikiMarkup = _emptyTable;
      return false;
    }

    var output = '';
    var notes = [];
    
    _emptyRange = false;

    _rows = _range.getNumRows();
    _cols = _range.getNumColumns();

    output += _startTable;

    for(var y = 1; y <= _rows; y++) 
    {
     output += _CRLF+'|-';
     var lastEmpty = false;
      
      // each cell
      for(var x = 1; x <= _cols; x++) 
      {
        var cell = _range.getCell(y,x);
        var note = cell.getNote();
        var merge = cell.getMergedRanges();
        var align = cell.getHorizontalAlignment();
        var weight = cell.getFontWeight();
        var formula = cell.getFormula().trim();
        var value = String(cell.getValue()).trim().replace("\n","<br/>");
        var params = "";
        var mergeOK = true;
        
        if(merge)
        {
          for(var i = 0; i < merge.length; i++) 
          {
            if(merge[i].getColumn() == cell.getColumn() && merge[i].getRow() == cell.getRow())
            {
              if(merge[i].getHeight() > 1)
              {params += 'rowspan="'+merge[i].getHeight()+'" ';}
              else
              {params += 'colspan="'+merge[i].getWidth()+'" ';}
            }
            else
            {mergeOK = false;}
          }
        }
        
        if(!mergeOK)
        {continue;}
        
        if(weight == "bold")
        {
          output += _CRLF+"! ";
          lastEmpty = false;
        }
        else
        if(value == "")
        {
          if(lastEmpty)
          {output += " || ";}
          else
          {output += _CRLF+"| ";}
          lastEmpty = true;
        }
        else
        {
          output += _CRLF+"| ";
          lastEmpty = false;
        }

        if(value != "")
        {       
          if(align != "")
          {
            if(align.indexOf("left") >= 0)
            {params += 'style="text-align:left;" ';}
            else
              if(align.indexOf("right") >= 0)
              {params += 'style="text-align:right;" ';}
            else
              if(align.indexOf("center") >= 0)
              {params += 'style="text-align:center;" ';}
          }
          
          if(params != "")
          {output += params+"| ";}
          
          if(formula != "" && formula.substr(0,11) == "=HYPERLINK(")
          {
            var splitted = JSON.parse('[' + formula.substring(11,formula.length-1) + ']');
            
            if(splitted.length > 1)
            {output += "[["+splitted[0]+"|"+splitted[1]+"]]";}
            else
            {output += "[["+splitted[0]+"]]";}                    
          }
          else
          {output += value;}
        }                
        
        if(note != "")
        {
         var index = notes.indexOf(note); 
         if(index < 0) 
         {
          index = notes.length;
          notes.push(note);
          output += '<ref name="ref_'+index+'">'+note+'</ref>';
         }
         else
         {output += '<ref name="ref_'+index+'"/>';}          
        }
      }     
    }
    output += _CRLF + _endTable;
    
    if(notes.length > 0)
    {output += _CRLF + "<references/>";}
    
    _wikiMarkup = output;
  }

  return {
    /**
     * Returns the string representation of this object.
     * @return string text
     */
    toString: function() 
    {
      return this.getWikiMarkup();
    },

    /**
     * Returns wikitable markup text string.
     * @return string text
     */
    getWikiMarkup: function() 
    {
      return _wikiMarkup;
    },

    /**
     * Returns spreadsheet Range of values.
     * @return Range
     */
    getRange: function() 
    {
      return _range;
    },

    /**
     * Sets spreadsheet Range of values.
     * @return this object
     */
    setRange: function(range)
    {
      _range = (typeof range === 'object') ? _range = range : {};
      _convert();
      return this;
    },

    /**
     * Returns true if spreadsheet range is empty; false, otherwise.
     * @return boolean value
     */
    isRangeEmpty: function() 
    {
      return _emptyRange;
    }

  };
};
