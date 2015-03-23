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
 * MarkdownTableWorksAddOn.gs
 * Designed for Google Drive Spreadsheets. Converts a range of
 *  selected values into a wiki table by using
 *  the WikiTableMaker object. Adds Sidebar preview.
 *
 *
 * @license The Unlicense http://unlicense.org/
 * @version 1.0.1
 * @updated 2015-03-20
 * @author  The Pffy Authors https://github.com/pffy/
 * @link    https://github.com/pffy/googledocs-addon-wikitableworks
 *
 */
var product = {

  "name": "WikiTableWorks",
  "version": "1.0.1",

  "license": "This is free, libre and open source software.",
  "licenseUrl": "http://unlicense.org/",

  "author": "The Pffy Authors",
  "authorUrl": "https://github.com/pffy",

  "sidebarTitle": "WikiTableWorks",
  "sidebarFilename": "WikiTableWorksSidebar",

  "exportTextFileExtension": ".txt",
  "exportWikiFileExtension": ".wiki",
  "exportPrefix": "WikiTable-",

  "convertMenuItem": "Convert range to wiki table...",
  "loading": "Loading...",

  "tagline": "Live long and prosper."
}

var menuItems = {
  "convert": "Convert range to wiki table ...",
  "derp": "derp"
}

/**
 * Add-On UI/Menus
 **/

// saves spreadsheet selection as wiki document, returns URL
function saveAsWiki() {

  var outfile = product.exportPrefix + '-'
    + _getSheetName() + '-'
    + _generateFileId() + product.exportWikiFileExtension;

  var drv = DriveApp.createFile(outfile,
    '' + _convertMarkup(), MimeType.PLAIN_TEXT);

  return drv.getUrl();
}

// handles convert menu item
function _convertItem() {

  var ui = HtmlService
    .createHtmlOutputFromFile(product.sidebarFilename)
    .setTitle(product.sidebarTitle);

  ui.append(
    '<div class="wrapper">'
    + '<textarea READONLY>' + _convertMarkup() + '</textarea></br/>'
    + '<button class="action" onClick="saveWiki();">Save As Wiki</button>'
    + '<div id="msg">&nbsp;</div>'
  );

  SpreadsheetApp.getUi()
    .showSidebar(ui);
}

// converts range to wiki table markup
function _convertMarkup() {
  var range = SpreadsheetApp.getActiveSheet().getActiveRange();
  return '' + new WikiTableMaker(range);
}

// returns name of the container spreadsheet
function _getSheetName() {
  return SpreadsheetApp.getActiveSpreadsheet().getName();
}

// returns file id based on date and time
function _generateFileId() {
  return Utilities.formatDate(new Date(), "PST", "yyyymmdd-HHmmss");
}

// adds menus to Google Drive Spreadsheets
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createAddonMenu()
      .addItem(menuItems.convert, '_convertItem')
      .addToUi();
}

// automatic start after install
function onInstall() {
  onOpen();
}