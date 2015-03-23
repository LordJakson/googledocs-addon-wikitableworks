# googledocs-addon-wikitableworks

## QUICK START

  + WikiTableWorks.
  + [Google Spreadsheets](http://www.google.com/sheets/about/) Add-On.
  + Converts Google Sheets (Google Docs Spreadsheets) selection into a wiki table.
  + Use tables on GitHub wikis, Wikipedia, MediaWiki or any wiki web site.
  + Wait... What is a [wikitable](http://simple.wikipedia.org/wiki/Wikipedia:Wikitable)?
  + Save table to Google Drive with the `.wiki` file extension.
  + Edit the wiki file with compatible third-party Drive apps.
  + Uses the [WikiTableMaker](https://github.com/pffy/googledocs-addon-wikitable) object.
  + Written in Google Apps Script.


## DETAILS
  + [INSTALL](#install)
  + [PERMISSIONS](#permissions)
  + [LICENSE](#license)


## INSTALL

### CHROME WEB STORE INSTALL

  + [Install WikiTableWorks](https://chrome.google.com/webstore/detail/wikitableworks/fcidnbkcodoajhfbcaefikfemlggcpfp)
  from Google Chrome Web Store.
  + https://chrome.google.com/webstore/detail/wikitableworks/fcidnbkcodoajhfbcaefikfemlggcpfp
  + **Recommended.** Apps and add-ons are actively [monitored and curated by Google](https://support.google.com/chrome_webstore/answer/1050586).

[![chromewebstore_badgewborder_v2_340x96](https://cloud.githubusercontent.com/assets/7258373/6788162/ee497942-d154-11e4-934d-ef386061181d.png)](https://chrome.google.com/webstore/detail/wikitableworks/fcidnbkcodoajhfbcaefikfemlggcpfp)

### MANUAL INSTALL

  + You can build your own copy of the app using the Google Docs Script Editor.
  + First, you will setup the project containers. Next, you will copy and paste the code. Finally, you will finish the install by closing the editor, refreshing the spreadsheet and authorizing the add-on.

#### SETUP THE PROJECT

  + Open a spreadsheet created in Google Sheets.
  + Go to the **Tools** menu. Click on **Script Editor**.
  + If prompted, create a script for a **Blank Project**.
  + Delete all the code in **Code.gs**. The file should be blank.
  + Go to the **File** menu. **Save** the project with any name you want. (e.g., **WIKITABLE**)
  + Make a copy of the blank **Code.gs** file. There should be 2 files now.
  + Go to the **File** menu. Select **New** > **Html file**.
  + Rename the HTML file to **WikiTableWorksSidebar**. Delete all the code in this file.
  + Rename one of the Google Script files to **obj**.
  + Rename the other Google Script file to **addon**.
  + You should now have three files:
    + **obj.gs**
    + **addon.gs**
    + **WikiTableWorksSidebar.html**

> NOTE: While the Google Apps Script (.gs) server-side files can be named anything,
The HTML files must match exact names.


#### COPY AND PASTE

  + Copy all the contents of [**WikiTableMaker.gs**](https://raw.githubusercontent.com/pffy/googledocs-addon-wikitableworks/master/WikiTableMaker.gs) and paste them into **obj.gs**.
  + Copy all the contents of [**WikiTableWorksAddOn.gs**](https://github.com/pffy/googledocs-addon-wikitableworks/blob/master/WikiTableMakerAddOn.gs) and paste them into **addon.gs**.
  + Copy all the contents of [**WikiTableWorksSidebar.html**](https://raw.githubusercontent.com/pffy/googledocs-addon-wikitableworks/master/WikiTableWorksSidebar.html) and paste them into **WikiTableWorksSidebar.html**.

#### FINISHING

  + Close the **Script Editor**.
  + Save and/or refresh your spreadsheet in Google Sheets.
  + **WikiTableWorks** should now appear as one of your main menu items.
  + Start using the add-on by choosing any of the **WikiTableWorks** menu items.
  + You will need to authorize [PERMISSIONS](#permissions) before you can activate the add-on.


## PERMISSIONS
  + Needs access to Google Docs, Google Drive.
  + When you first run the Add-On, Google will request authorization for the app.
  + If authorization is given,
  you can always [revoke it here](https://security.google.com/settings/security/permissions) when
  no longer needed.
  + You can see why distributing [free software](https://www.gnu.org/philosophy/free-sw.html)
   is so important to your privacy.


## LICENSE

  + The Unlicense
  + This is free, libre and open source software.
  + [Learn more](https://github.com/pffy/googledocs-addon-wikitableworks/blob/master/LICENSE)

