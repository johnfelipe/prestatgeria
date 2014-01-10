<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="{lang}" lang="{lang}">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset={charset}" />
        <meta name="description" content="{$modvars.ZConfig.slogan}" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="{$modvars.ZConfig.sitename}" />
        <meta name="copyright" content="Copyright (c) 2009 by {$modvars.ZConfig.sitename}" />
        <meta name="generator" content="Zikula {$coredata.version_num} - http://zikula.org" />
        <title>{pagegetvar name='title'}</title>
        <link rel="icon" type="image/x-icon" href="{$imagepath}/favicon.ico" /> {* W3C *}
        <link rel="shortcut icon" type="image/ico" href="{$imagepath}/favicon.ico" /> {* IE *}
        <link rel="stylesheet" href="{$themepath}/style/{$stylesheet}" type="text/css" />
        <style type="text/css">

        </style>
    </head>

    <body>
        <div id="wrapper">
            <div id="header">
                <div id="minilogoleft">
                    <a href="http://www.gencat.cat/educacio/" target="_blank">
                        <img src="{$themepath}/images/logo2.png" alt="" title="" />
                    </a>
                </div>
                <div id="minilogoright">
                    <a href="http://www.xtec.cat" target="_blank">
                        <img src="{$themepath}/images/logo3.png" alt="" title="" />
                    </a>
                </div>
                <div id="logoleft">
                    <a href="index.php">
                        <img src="{$themepath}/images/logo4.png" alt="" title="" />
                    </a>
                </div>
                <div id="logoright">
                    <a href="index.php">
                        <img src="{$themepath}/images/logo1.png" alt="" title="" />
                    </a>
                </div>
                <div id="menu">
                    <span class="menuitems">
                        {blockposition name=menu}
                        <a href="index.php">Inici</a>&nbsp;|&nbsp;
                        <a href="index.php?module=Pages&func=display&pageid=1">Condicions d'&uacute;s</a>&nbsp;|&nbsp;
                        <a href="http://phobos.xtec.cat/forum/viewforum.php?f=43" target="_blank">F&ograve;rum</a>
                    </span>
                </div>
                <div id="menubar">
                </div>
            </div>
            <div id="contentwrapper">
                <div id="contentcolumn">
                    <div class="innertube" id="theme_content">
                        {blockposition name=center}
                        {$maincontent}		
                    </div>
                </div>
            </div>
            <div id="leftcolumn">
                <div class="innertube">
                    {blockposition name=left}
                </div>
            </div>
            <div id="rightcolumn">
                <div class="innertube">
                    {blockposition name=right}
                </div>
            </div>
        </div>
        <div id="themefooter">
            {$footmesg}
        </div>
    </body>

</html>